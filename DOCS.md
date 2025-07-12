
# Pegasus API Toolkit

## Introduction

Pegasus API Toolkit is a comprehensive library designed to streamline the development of Node.js APIs using NestJS within the Pegasus ecosystem. It provides a rich set of pre-built modules, classes, and utilities that handle common API development tasks such as authentication, caching, database interaction, file storage, background tasks, and more. By leveraging this toolkit, developers can significantly reduce boilerplate code, enforce consistency, and focus on implementing business logic.

This document provides an overview of the available modules and their functionalities.

## Modules

The toolkit is organized into several modules, each providing a specific set of features.

### Auth

The `Auth` module provides functionalities for user authentication and authorization. It integrates with Clerk for user management and provides guards and decorators to protect your application's routes.

#### `AuthModule`

This is the main module for authentication. You need to import it into your root module to enable authentication features.

#### `AuthServicePort`

This is the port for the authentication service. It defines the contract for authentication-related operations.

##### Methods

-   `verifyToken(token: string): Promise<AuthUserEntity>`
    -   Verifies a JWT token and returns the authenticated user.
    -   **Input**:
        -   `token`: The JWT token string.
    -   **Output**: A promise that resolves to an `AuthUserEntity`.

-   `getUser(params: { userId: string; organizationId: string; organizationRole: string; ignoreCache?: boolean; }): Promise<AuthUserEntity>`
    -   Retrieves user details by their ID and organization context.
    -   **Input**:
        -   `userId`: The user's ID.
        -   `organizationId`: The organization's ID.
        -   `organizationRole`: The user's role in the organization.
        -   `ignoreCache` (optional): If `true`, bypasses the cache.
    -   **Output**: A promise that resolves to an `AuthUserEntity`.

-   `getSystemUserForOrganization(organizationId: string): Promise<AuthUserEntity>`
    -   Creates a "system" user for a given organization, useful for internal processes.
    -   **Input**:
        -   `organizationId`: The ID of the organization.
    -   **Output**: A promise that resolves to a system `AuthUserEntity`.

-   `generateGcpServiceAccountToken(): Promise<string>`
    -   Generates an identity token for a GCP service account.
    -   **Output**: A promise that resolves to the token string.

-   `getUserWithoutOrganization(userId: string, ignoreCache?: boolean): Promise<AuthUserEntity>`
    -   Retrieves user details without any organization context.
    -   **Input**:
        -   `userId`: The user's ID.
        -   `ignoreCache` (optional): If `true`, bypasses the cache.
    -   **Output**: A promise that resolves to an `AuthUserEntity` with `organization` as `null`.

-   `getUserOrganizations(userId: string): Promise<OrganizationEntity[]>`
    -   Retrieves all organizations a user is a member of.
    -   **Input**:
        -   `userId`: The user's ID.
    -   **Output**: A promise that resolves to an array of `OrganizationEntity`.

-   `getUserByPhoneNumber(phoneNumber: string): Promise<AuthUserEntity | null>`
    -   Finds a user by their phone number.
    -   **Input**:
        -   `phoneNumber`: The user's phone number.
    -   **Output**: A promise that resolves to an `AuthUserEntity` or `null` if not found.

#### Entities & Schemas

-   `AuthUserEntity`: Represents the authenticated user.
    ```typescript
    object({
      id: z.string(),
      primaryEmail: z.string().email(),
      primaryPhoneNumber: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      organization: OrganizationSchema.nullish(),
    })
    ```

-   `OrganizationEntity`: Represents the user's organization.
    ```typescript
    object({
      id: z.string(),
      name: z.string(),
      type: z.nativeEnum(OrganizationType),
      role: z.nativeEnum(OrganizationRole),
      parent: z.object({ ... }).nullish(),
      children: z.array(z.object({ id: z.string(), name: z.string() })).nullish(),
    })
    ```

#### Decorators

-   `@AuthUser()`: Injects the `AuthUserEntity` of the current user into a controller's method parameter.
-   `@IgnoreAuthGuard()`: Disables the default authentication guard for a specific route.
-   `@IgnoreGcpServiceAccountGuard()`: Disables the GCP service account guard for a specific route.
-   `@OrganizationRoles(...roles: OrganizationRole[])`: Decorator to specify which organization roles are allowed to access a route.
-   `@OrganizationTypes(...types: OrganizationType[])`: Decorator to specify which organization types are allowed to access a route.

#### Guards

-   `AuthGuard`: A guard that protects routes by validating the JWT token from the `Authorization` header.
-   `GcpServiceAccountGuard`: A guard that protects routes by validating a GCP service account token.
-   `OrganizationRolesGuard`: A guard that enforces access control based on the user's role within their organization.
-   `OrganizationTypesGuard`: A guard that enforces access control based on the user's organization type.
-   `TaskQueueGuard`: A guard for securing task queue handlers by checking a secret key in the `x-tasks-queue-secret` header.

---

### Cache

The `Cache` module provides a flexible caching solution with support for different storage backends.

#### `CacheServicePort`

Defines the contract for the cache service.

##### Methods

-   `get(key: string): Promise<string | null>`
    -   Retrieves a value from the cache.
    -   **Input**: `key` - The cache key.
    -   **Output**: The cached string value, or `null` if not found.

-   `set(key: string, value: string, ttlInSeconds?: number): Promise<void>`
    -   Stores a value in the cache.
    -   **Input**:
        -   `key`: The cache key.
        -   `value`: The string value to store.
        -   `ttlInSeconds` (optional): Time-to-live in seconds.

-   `delete(key: string): Promise<void>`
    -   Deletes a value from the cache.
    -   **Input**: `key` - The cache key.

---

### Clerk

This module provides integration with Clerk for user management.

#### `ClerkModule`

The main module for Clerk integration. It sets up the Clerk client.

#### Constants

-   `CLERK_CLIENT`: Injection token for the Clerk client instance.
-   `CLERK_VERIFY_TOKEN`: Injection token for the `verifyToken` function from Clerk's backend SDK.

---

### Config

Handles application configuration.

#### `BaseConfigEntity`

A Zod-based entity that defines the schema for the application's configuration. It includes settings for databases, authentication, logging, GCP, and other services.

---

### Correlation

This module helps with tracking requests through different services.

#### Constants

-   `correlationIdKey`: Key used to store the correlation ID in the CLS context.
-   `correlationIdHeaderKey`: HTTP header key for passing the correlation ID (`x-correlation-id`).

---

### Database

Provides tools for interacting with MongoDB databases.

#### `BaseMultitenantMongoDbRepositoryAdapter` & `BaseDefaultMongoDbRepositoryAdapter`

Abstract base classes for creating MongoDB repositories. They provide a set of common methods for CRUD operations.

##### Methods

-   `create(params: { requester: AuthUserEntity; request: TCreateRequest; ... })`: Creates a new document.
-   `findByIdOrThrow(params: { requester: AuthUserEntity; request: TFindOneRequest; ... })`: Finds a document by ID or throws a `NotFoundException`.
-   `findById(params: { ... })`: Finds a document by ID, returning `null` if not found.
-   `partialUpdateOrThrow(params: { ... })`: Partially updates a document or throws a `NotFoundException`.
-   `partialUpdate(params: { ... })`: Partially updates a document, returning `null` if not found.
-   `removeOrThrow(params: { ... })`: Soft-deletes a document or throws a `NotFoundException`.
-   `remove(params: { ... })`: Soft-deletes a document.
-   `startSession(): Promise<BaseSessionPort>`: Starts a new database session for transactions.

---

### Email

Provides a service for sending emails.

#### `EmailServicePort`

Defines the contract for the email service.

##### Methods

-   `send(params: { email: z.output<typeof EmailSchema>, to: string }): Promise<void>`
    -   Sends an email using a template.
    -   **Input**:
        -   `email`: A Zod object conforming to `EmailSchema`, containing the template name and data.
        -   `to`: The recipient's email address.

#### `EmailSchema`

A discriminated union Zod schema for validating email data.

-   **Template**: `BULK_CREATE_AI_FILE_EXTRACTION_FINISHED`
    -   **Data Schema**: `{ name: string; fileName: string; nFinancialRecords: number; continueUrl: string; }`

---

### Files

Handles file uploads, storage, and retrieval.

#### `FilesServicePort`

Defines the high-level contract for file-related operations.

##### Methods

-   `createUploadRequest(params: { ... }): Promise<{ file: FileEntity; uploadUrl: string }>`
    -   Creates a file record in the database and generates a signed URL for uploading.
    -   **Input**: `CreateFileUploadRequestEntity`
    -   **Output**: An object containing the created `FileEntity` and the `uploadUrl`.

-   `confirmUploadRequest(params: { ... }): Promise<FileEntity>`
    -   Confirms that a file upload is complete and updates its status.
    -   **Input**: `ConfirmFileUploadRequestEntity`
    -   **Output**: The updated `FileEntity`.

-   `removeOrThrow(params: { ... }): Promise<void>`
    -   Soft-deletes a file.
    -   **Input**: `RemoveFileRequestEntity`

-   `getFilesSignedUrlsOrThrow(files: FileEntity[]): Promise<FileEntity[]>`
    -   Retrieves signed download URLs for multiple files.

-   `getSignedUrlFromUrl(params: { ... }): Promise<string>`
    -   Generates a new signed URL from an existing (potentially expired) file URL.

-   `findByIdOrThrow(params: { ... }): Promise<FileEntity>`
    -   Finds a file by its ID, throwing an error if it's pending or deleted.

#### `ObjectStorageServicePort`

Defines the contract for the object storage service.

##### Methods

-   `createSignedUploadUrl(params: { ... }): Promise<string>`
-   `createSignedDownloadUrl(params: { ... }): Promise<string>`
-   `createManySignedDownloadUrls(params: { ... }): Promise<string[]>`
-   `generateUniqueObjectName(params: { ... }): string`
-   ... and methods for streaming and getting object size.

#### Entities & Schemas

-   `FileEntity`: Represents a file.
    ```typescript
    object({
      id: z.string(),
      ownerOrganization: z.string(),
      originalFileName: z.string(),
      mimeType: z.string(),
      size: z.number(),
      fileType: z.nativeEnum(FileType),
      objectName: z.string(),
      status: z.nativeEnum(FileStatus),
      url: z.string(),
      signedUrl: z.string(),
      // ... timestamps
    })
    ```
-   `CreateFileUploadRequestBodyDto`: DTO for creating an upload request.
    ```typescript
    object({
      originalFileName: z.string(),
      mimeType: z.string(),
      size: z.number(),
      fileType: z.nativeEnum(FileType),
      channel: z.nativeEnum(CHANNEL_TYPES),
      caption: z.string().nullish(),
    })
    ```
-   `ConfirmFileUploadRequestBodyDto`: DTO for confirming an upload.
    ```typescript
    object({
      id: z.string(),
      status: z.enum([FileStatus.FAILED, FileStatus.COMPLETED]),
      channel: z.nativeEnum(CHANNEL_TYPES),
    })
    ```

---

### Health

Provides a health check endpoint for the service.

#### `HealthModule`

The main module for the health check feature.

#### `HealthController`

Exposes a `/` endpoint that can be used to monitor the health of the application.

---

### Link Shortner

A service for creating short links.

#### `LinkShortnerServicePort`

Defines the contract for the link shortening service.

##### Methods

-   `createShortLink(url: string): Promise<string>`
    -   Creates a short link for the given URL.
    -   **Input**: `url` - The original URL.
    -   **Output**: The shortened URL.

---

### Logger

Provides a structured logging solution.

#### `LoggerModule`

The main module for logging. It uses Pino for performance and can be configured to log to the console and a remote service like Better Stack.

#### `LOGGER_SERVICE_PORT`

The injection token for the logger service, which implements NestJS's `LoggerService`.

---

### Page

Utilities for handling pagination.

#### Entities

-   `PageQueryEntity`: A DTO for pagination query parameters (`pageIndex`, `pageSize`).
-   `PageInfoEntity`: An entity that holds pagination metadata (`totalPages`, `totalItems`, etc.).

---

### Pub/Sub

Provides a publish-subscribe service for asynchronous communication.

#### `PubSubServicePort`

Defines the contract for the Pub/Sub service.

##### Methods

-   `publish(params: { topic: string; payload: Record<string, unknown>; correlationId?: string; }): Promise<void>`
    -   Publishes a message to a topic. This is an unsafe operation that buffers messages for performance.
    -   **Input**:
        -   `topic`: The name of the topic.
        -   `payload`: The message payload.
        -   `correlationId` (optional): The correlation ID for tracing.
-   `unsafePublish(params: { topic: string; payload: Record<string, unknown>; }): void;`
    - Publishes a message to a topic without waiting for confirmation.
-   `flushPublishBuffer({ max }: { max?: number }): Promise<void>`
     - Flushes the publish buffer, sending all buffered messages.
-   `stopAutoFlushPublishBuffer(): Promise<void>`
     - Stops the automatic flushing of the publish buffer.
-   `publishWebsocketMessage(params: { message: WebsocketMessageEntity; correlationId?: string; }): Promise<void>`
    -   Publishes a message to the websocket topic.
-   `unsafePublishWebsocketMessage(params: { message: WebsocketMessageEntity; }): void`
    -   Publishes a message to the websocket topic without waiting for confirmation.

---

### Sentry

Integrates Sentry for error tracking and performance monitoring.

#### `SentryModule`

The main module for Sentry integration. It sets up a middleware to automatically capture the correlation ID for Sentry events.

---

### Tasks

A module for creating and managing background tasks.

#### `TasksServicePort`

Defines the contract for the tasks service.

##### Methods

-   `appendTask(params: { task: TaskEntity; correlationId?: string; }): Promise<void>`
    -   Appends a task to a queue. This is an unsafe operation that buffers tasks for performance.
    -   **Input**:
        -   `task`: The `TaskEntity` to be executed.
        -   `correlationId` (optional): The correlation ID.

#### `TaskEntity`

An entity representing a task to be executed.

```typescript
object({
  queue: z.string(),
  microservice: z.string(),
  payload: z.record(z.string(), z.any()),
})
```
---

### Utils

A collection of utility functions and types.

-   **`auth.utils.ts`**: Mocks for testing authentication.
-   **`channel.utils.ts`**: Defines channel types (`WEB_APP`, `WHATSAPP`, etc.).
-   **`clerk.utils.ts`**: Mocks and test data for Clerk integration.
-   **`entity.utils.ts`**: `safeInstantiateEntity` for creating immutable entity instances from raw data.
-   **`environment.utils.ts`**: Functions to check the current runtime environment (`local`, `dev`, `prod`, etc.).
-   **`json.utils.ts`**: Custom replacer/reviver for `JSON.stringify`/`JSON.parse` to handle special types like `Error` and `BigInt`.
-   **`log.utils.ts`**: The `@Log()` decorator for automatically logging method inputs, outputs, and errors.
-   **`setup.utils.ts`**: Helper function `setupApp` to configure a NestJS application with global pipes, filters, and Swagger.
-   **`zod.utils.ts`**: Custom Zod types for common patterns like coerced booleans and date strings.

---

### Base

#### `Base` class

A base class that provides a standardized way to handle logging within services and adapters. It includes methods like `log`, `logError`, `logWarn`, etc., which automatically include the class name and correlation ID in log messages.

---

### App Exceptions

#### `AppExceptionsFilter`

A global exception filter that catches all unhandled exceptions and formats them into a standardized error response. It also logs errors and reports them to Sentry for 5xx-level errors. 