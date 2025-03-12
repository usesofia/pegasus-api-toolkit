echo "Building..."
pnpm build;

echo "Checking if package.json version is incremented..."
CURRENT_VERSION=$(jq -r '.version' package.json)
PREVIOUS_VERSION=$(git show HEAD:package.json | jq -r '.version')

if [ "$CURRENT_VERSION" == "$PREVIOUS_VERSION" ]; then
  echo "Package.json version is not incremented. Current: $CURRENT_VERSION, Previous: $PREVIOUS_VERSION"
  exit 1
fi

echo "Package.json version is changed from $PREVIOUS_VERSION to $CURRENT_VERSION. Committing..."

git add .
git commit -m "chore: bump version to $CURRENT_VERSION"
git push

echo "Committed and pushed!"

echo "Tagging..."
git tag v$CURRENT_VERSION
git push origin v$CURRENT_VERSION

echo "Tagged and pushed!"

echo "Creating release..."
gh release create v$CURRENT_VERSION --generate-notes

echo "Release v$CURRENT_VERSION created!"
