# Pegasus API Toolkit

Contém uma série de módulos, classes, funções, decorators etc para facilitar a vida de quem desenvolve as APIs do Pegasus.

## Organizações e usuários de teste

## Usuários de teste

A menos que indicado o contrário, os usuários são administradores (ADMIN) das organizações.

- marco+joao@usesofia.com (Ambev)
- marco+joana@usesofia.com (Ambev - MEMBER)
- marco+maria@usesofia.com (Embraer)
- marco+pele@usesofia.com (Embraer)
- marco+juliana@usesofia.com (Ambev e Embraer)
- marco+lucas@usesofia.com (Vettor BPO)
- marco+rony@usesofia.com (Loja Reserva 42)
- marco+caito@usesofia.com (Loja Chillibeans 312)
- marco+daniel@usesofia.com (Nagumo Supermercados)
- marco+renata@usesofia.com (Loja Nagumo 123)
- marco+fernanda@usesofia.com (Loja Nagumo 321)
- marco+ronaldo@usesofia.com (Nagumo Supermercados e Vettor BPO)
- marco+pedro@usesofia.com (sem nenhuma organização)
- marco+manoel@usesofia.com (Nagumo Supermercados, Loja Nagumo 123 e Loja Nagumo 321)

## Organizações de teste

- Ambev (LEAF):
    - Usuários:
        - marco+joao@usesofia.com
        - marco+joana@usesofia.com (MEMBER)
        - marco+juliana@usesofia.com
- Embraer (LEAF):
    - Usuários:
        - marco+maria@usesofia.com
        - marco+juliana@usesofia.com
        - marco+pele@usesofia.com
- Vettor BPO (GROUP sem compartilhamento de recursos):
    - Usuários:
        - marco+lucas@usesofia.com
        - marco+ronaldo@usesofia.com
    - Organizações filhas:
        - Loja Reserva 42 (LEAF):
            - Usuários:
                - marco+rony@usesofia.com
        - Loja Chillibeans 312 (LEAF):
            - Usuários:
                - marco+caito@usesofia.com
- Nagumo Supermercados (GROUP com compartilhamento de recursos):
    - Usuários:
        - marco+daniel@usesofia.com
        - marco+ronaldo@usesofia.com
        - marco+manoel@usesofia.com
    - Organizações filhas:
        - Loja Nagumo 123 (LEAF):
            - Usuários:
                - marco+renata@usesofia.com
                - marco+manoel@usesofia.com
        - Loja Nagumo 321 (LEAF):
            - Usuários:
                - marco+fernanda@usesofia.com
                - marco+manoel@usesofia.com
