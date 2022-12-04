# Backend

## Entities

### Card

- id
- title
- description
- columnId

### Column

- id
- name
- cards

### User

- id
- name
- email

### Project

- id
- name
- columns

## Use cases

- List project's cards inside columns
- Create new columns
- Create new cards inside columns
- Delete card
- Delete column
- Rename column names
- Drag cards from one column to another
- Drag columns to change their order
- Add checklist to cards
