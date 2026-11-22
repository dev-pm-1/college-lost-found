# College Lost & Found Portal

## Antigravity Project Context and Initial Build Prompt

**Project type:** College mini-project / full-stack web application\
**Project name:** College Lost & Found Portal\
**Frontend:** React + Vite\
**Backend:** Python + FastAPI\
**Database:** PostgreSQL\
**ORM and migrations:** SQLAlchemy 2.x + Alembic\
**Containerization:** Docker + Docker Compose\
**Development approach:** Incremental, testable, end-to-end
implementation

------------------------------------------------------------------------

# PART A --- PROJECT CONTEXT

## 1. Project summary

Build a responsive web application for a college campus where students
can report lost belongings, report items they have found, search
listings, submit ownership claims, and track the recovery process.
Administrators moderate listings, verify claims, manage users, and
record successful handovers.

The application must be a real working full-stack product. Do not create
a frontend-only mockup. Forms, buttons, filters, authentication,
database operations, image uploads, claims, notifications, and admin
actions must be connected to the backend and persist correctly.

## 2. Problem statement

Traditional college lost-and-found processes often depend on notice
boards, messaging groups, or informal communication. These approaches
make it difficult to search older reports, organize item information,
verify ownership, and track whether an item has been returned.

The portal provides one organized platform for reporting, searching,
claiming, and recovering lost belongings.

## 3. Main objectives

1.  Provide a centralized lost-and-found platform for students and
    staff.
2.  Allow users to report lost and found items with descriptions, dates,
    locations, and photographs.
3.  Provide search, sorting, and filtering of item listings.
4.  Support a controlled claim and ownership-verification workflow.
5.  Give administrators tools to moderate listings and claims.
6.  Notify users when important events occur.
7.  Store data persistently in PostgreSQL.
8.  Make the application easy to run using Docker Compose.

## 4. User roles and permissions

### Student

A student can: - Register, log in, and log out. - View the public
landing page and approved listings. - Create a lost-item report. -
Create a found-item report. - Upload an item photograph. - View item
details. - Search and filter listings. - Edit or delete their own
eligible listings. - Submit a claim for a found item. - Cancel their own
pending claim. - View their own reports and claims. - Read and mark
notifications as read. - Update their profile.

A student must not: - Access admin pages or admin APIs. - Approve or
reject listings or claims. - Change another user's reports. - View
private ownership-verification information submitted by another
claimant. - Mark an item as returned without authorized admin action.

### Administrator

An administrator can: - View dashboard statistics. - View, approve,
reject, and moderate item listings. - View all claims and review
ownership evidence. - Approve or reject claims. - Record successful
handovers and mark items returned. - View and manage users. - Suspend or
reactivate users. - View reports and recovery statistics. - Manage item
categories.

Enforce permissions on the backend. Hiding a button in React is not
sufficient security.

## 5. Core features

### 5.1 Authentication and profile

-   Registration with full name, college email, student/enrollment ID,
    department, and password.
-   Login and logout.
-   Secure password hashing using Argon2 or bcrypt.
-   JWT-based authentication.
-   Current-user endpoint.
-   Role-based authorization.
-   Profile viewing and updating.
-   Optional password-reset flow may be added after core functionality
    works.

Use environment configuration for any allowed college email domain. Do
not assume a specific college email domain; make it configurable.

### 5.2 Dashboard

Student dashboard: - Total active lost reports created by the user. -
Total active found reports created by the user. - Pending claims
submitted by the user. - Recent reports and notifications. - Quick
actions to report a lost or found item.

Admin dashboard: - Total users. - Total listings. - Lost listings. -
Found listings. - Pending listing reviews. - Pending claims. - Returned
items. - Recovery rate, with a clearly defined calculation. - Recent
activity.

All figures must come from the database, not hardcoded sample numbers.

### 5.3 Lost-item reports

Fields: - Title/item name. - Description. - Category. - Lost date. -
Approximate location on campus. - Optional image. - Optional additional
identifying details (private; not shown publicly).

### 5.4 Found-item reports

Fields: - Title/item name. - Description. - Category. - Found date. -
Found location. - Optional image. - Optional private identifying
details. - Optional indication of where the item is being safely held.

Do not encourage users to publish sensitive information such as full ID
numbers, phone numbers, bank-card details, or private documents.

### 5.5 Listings and discovery

Provide: - Browse all approved, active listings. - Separate Lost and
Found views or tabs. - Search by title and description. - Filters by
type, category, location, date range, and status where appropriate. -
Sorting by newest and oldest. - Pagination. - Item detail page. - Clear
status labels. - Empty, loading, and error states.

Public listings should reveal only information needed to identify the
general item. Keep sensitive identifying details private so a claimant
can prove ownership.

### 5.6 Claims and ownership verification

A student can submit a claim against a found-item listing.

Claim fields: - Item ID. - Claim message. - Private ownership-proof
description. - Optional additional verification notes.

Workflow: 1. Student opens a found-item detail page. 2. Student submits
a claim. 3. Claim is saved with `PENDING` status. 4. Admin reviews the
claim and private proof details. 5. Admin approves or rejects the claim
and records an internal review note. 6. If approved, the item enters a
handover-pending state. 7. Admin records the handover after verifying
the claimant in person. 8. Item is marked `RETURNED` and the claim is
marked `COMPLETED`. 9. Relevant users receive in-app notifications.

Rules: - A user cannot claim their own found-item listing. - Prevent
duplicate active claims by the same user for the same item. - Only
authorized admins can approve or reject claims. - Do not expose claim
proof details to other students. - An approved claim is not the same as
a completed handover. - An item can have multiple claim records, but
only one successful completed recovery. - Use database transactions when
changing claim and item states.

### 5.7 Listing moderation

New listings should have a moderation status such as `PENDING`,
`APPROVED`, or `REJECTED`. Only approved listings should be publicly
visible.

Admins can approve or reject a listing and optionally record a reason.
Notify the listing owner of the decision.

### 5.8 Notifications

Implement in-app notifications stored in PostgreSQL.

Examples: - Listing submitted. - Listing approved or rejected. - Claim
received. - Claim approved or rejected. - Item handover completed. -
Account suspended or reactivated.

Provide: - Notification list. - Unread indicator/count. - Mark one
notification as read. - Mark all as read.

Email notifications are optional and must not block the core project.

### 5.9 Image upload

-   Accept common image formats such as JPEG, PNG, and WebP.
-   Validate file type and size on the backend.
-   Generate safe unique filenames; do not trust user-supplied
    filenames.
-   Store uploaded files in a persistent Docker volume during local
    development.
-   Store the relative image path or URL in the database.
-   Do not store image binary data directly in ordinary item columns.
-   Handle missing or invalid images gracefully.
-   Set a sensible maximum upload size, for example 5 MB.

For a local college demo, a mounted upload volume is sufficient.
Document that production deployment should use object storage or another
durable file-storage service.

## 6. Item and claim status model

Keep moderation status, item lifecycle status, and claim status as
separate concepts.

Suggested listing moderation statuses: - `PENDING` - `APPROVED` -
`REJECTED`

Suggested item lifecycle statuses: - `OPEN` - `HANDOVER_PENDING` -
`RETURNED` - `CLOSED`

Suggested claim statuses: - `PENDING` - `APPROVED` - `REJECTED` -
`CANCELLED` - `COMPLETED`

Do not use one generic status field for all three concepts. Validate all
state transitions on the backend.

## 7. Database design

Use PostgreSQL with SQLAlchemy 2.x models and Alembic migrations.

### users

-   `id`: primary key.
-   `full_name`: required string.
-   `email`: required, unique, indexed.
-   `password_hash`: required.
-   `student_id`: optional or required according to project
    configuration; unique if present.
-   `department`: optional string.
-   `role`: `STUDENT` or `ADMIN`.
-   `is_active`: boolean.
-   `created_at`, `updated_at`: timestamps.

### categories

-   `id`: primary key.
-   `name`: unique required string.
-   `is_active`: boolean.
-   `created_at`: timestamp.

### items

-   `id`: primary key.
-   `title`: required string.
-   `description`: required text.
-   `type`: `LOST` or `FOUND`.
-   `category_id`: foreign key to categories.
-   `location`: required string.
-   `event_date`: date.
-   `image_path`: optional string.
-   `private_identifying_details`: optional private text; never include
    in public responses.
-   `moderation_status`: pending/approved/rejected.
-   `lifecycle_status`: open/handover_pending/returned/closed.
-   `moderation_note`: optional admin-only text.
-   `user_id`: foreign key to users.
-   `created_at`, `updated_at`: timestamps.

### claims

-   `id`: primary key.
-   `item_id`: foreign key to items.
-   `claimant_id`: foreign key to users.
-   `claim_message`: required text.
-   `proof_description`: required private text.
-   `status`: pending/approved/rejected/cancelled/completed.
-   `admin_review_note`: optional private text.
-   `reviewed_by`: optional foreign key to users.
-   `reviewed_at`: optional timestamp.
-   `completed_at`: optional timestamp.
-   `created_at`, `updated_at`: timestamps.

### notifications

-   `id`: primary key.
-   `user_id`: foreign key to users.
-   `message`: required text.
-   `type`: notification type string.
-   `related_item_id`: optional foreign key to items.
-   `related_claim_id`: optional foreign key to claims.
-   `is_read`: boolean default false.
-   `created_at`: timestamp.

Add appropriate indexes and constraints. Use relationships and cascading
behavior deliberately. Avoid deleting historical claim records when an
item or user is removed; prefer soft-deactivation or restricted deletion
where appropriate.

## 8. Backend technology and architecture

Use: - Python 3.12 or a currently supported compatible Python version. -
FastAPI. - Uvicorn. - SQLAlchemy 2.x. - Alembic. - PostgreSQL driver
such as psycopg. - Pydantic v2. - JWT library. - Argon2 or bcrypt
password hashing. - Pytest and FastAPI TestClient for tests.

Suggested backend structure:

``` text
backend/
  app/
    main.py
    core/
      config.py
      security.py
      dependencies.py
    db/
      base.py
      session.py
    models/
      user.py
      category.py
      item.py
      claim.py
      notification.py
    schemas/
      auth.py
      user.py
      item.py
      claim.py
      notification.py
    api/
      router.py
      routes/
        auth.py
        users.py
        items.py
        claims.py
        notifications.py
        admin.py
    services/
      auth_service.py
      item_service.py
      claim_service.py
      notification_service.py
    tests/
  alembic/
  alembic.ini
  requirements.txt
  Dockerfile
```

Keep route handlers relatively thin. Put business rules in service
functions. Use dependency injection for database sessions and
current-user/admin checks.

## 9. REST API requirements

Use the base prefix `/api/v1`.

### Authentication

-   `POST /auth/register`
-   `POST /auth/login`
-   `GET /auth/me`

Use a documented authentication strategy. If using OAuth2 password flow,
ensure the frontend sends credentials in the format expected by the
backend. Logout should clear client-side tokens; if refresh tokens or
server-side revocation are implemented, document the behavior.

### Users and profile

-   `GET /users/me`
-   `PATCH /users/me`

### Items

-   `GET /items`
-   `GET /items/{item_id}`
-   `POST /items`
-   `PATCH /items/{item_id}`
-   `DELETE /items/{item_id}`
-   `GET /items/my-items`

Support query parameters for search, type, category, location, date
range, sorting, page, and page size. Only return approved listings in
public browse endpoints. Owners and admins may have authorized access to
their own pending/rejected listings.

### Claims

-   `POST /claims`
-   `GET /claims/my-claims`
-   `GET /claims/{claim_id}`
-   `POST /claims/{claim_id}/cancel`

### Notifications

-   `GET /notifications`
-   `PATCH /notifications/{notification_id}/read`
-   `PATCH /notifications/read-all`

### Admin

-   `GET /admin/dashboard`
-   `GET /admin/items`
-   `PATCH /admin/items/{item_id}/approve`
-   `PATCH /admin/items/{item_id}/reject`
-   `GET /admin/claims`
-   `PATCH /admin/claims/{claim_id}/approve`
-   `PATCH /admin/claims/{claim_id}/reject`
-   `PATCH /admin/claims/{claim_id}/complete`
-   `GET /admin/users`
-   `PATCH /admin/users/{user_id}/suspend`
-   `PATCH /admin/users/{user_id}/activate`
-   `GET /admin/categories`
-   `POST /admin/categories`
-   `PATCH /admin/categories/{category_id}`

Use appropriate HTTP status codes, consistent JSON response shapes,
validation errors, and pagination metadata. Document APIs through
FastAPI OpenAPI/Swagger.

## 10. Frontend technology and architecture

Use: - React. - Vite. - JavaScript or TypeScript (prefer TypeScript if
practical; JavaScript is acceptable for a beginner project). - React
Router. - Axios or Fetch API. - Tailwind CSS or clean modular CSS. -
Lucide React icons. - A chart library only for admin analytics if
needed.

Suggested frontend structure:

``` text
frontend/
  src/
    api/
      client.js
      auth.js
      items.js
      claims.js
      notifications.js
      admin.js
    assets/
    components/
      Navbar.jsx
      Sidebar.jsx
      ProtectedRoute.jsx
      ItemCard.jsx
      SearchFilters.jsx
      StatusBadge.jsx
      LoadingState.jsx
      EmptyState.jsx
      ErrorState.jsx
    context/
      AuthContext.jsx
    layouts/
      PublicLayout.jsx
      StudentLayout.jsx
      AdminLayout.jsx
    pages/
      LandingPage.jsx
      LoginPage.jsx
      RegisterPage.jsx
      DashboardPage.jsx
      BrowseItemsPage.jsx
      ItemDetailsPage.jsx
      ReportLostPage.jsx
      ReportFoundPage.jsx
      MyReportsPage.jsx
      MyClaimsPage.jsx
      NotificationsPage.jsx
      ProfilePage.jsx
      admin/
        AdminDashboardPage.jsx
        AdminItemsPage.jsx
        AdminClaimsPage.jsx
        AdminUsersPage.jsx
        AdminCategoriesPage.jsx
    App.jsx
    main.jsx
  package.json
  Dockerfile
```

## 11. UI and visual design requirements

Create a professional, clean, responsive college portal. Avoid a generic
unstyled template.

Design direction: - Light background, white cards, navy/blue primary
color, subtle accent color. - Consistent spacing and typography. - Use a
readable font such as Inter. - Rounded cards and restrained shadows. -
Clear visual distinction between Lost and Found listings. - Responsive
layout for desktop, tablet, and mobile. - Accessible labels, keyboard
focus states, and adequate color contrast. - Use Lucide icons
consistently. - Provide toast messages or inline feedback for success
and errors.

Main public pages: - Landing page with explanation, search bar, recent
approved listings, and clear report buttons. - Login page. -
Registration page. - Browse listings page. - Item details page.

Student pages: - Dashboard. - Report lost item. - Report found item. -
My reports. - My claims. - Notifications. - Profile.

Admin pages: - Admin dashboard. - Listing moderation. - Claim review. -
User management. - Category management.

Every page must include realistic loading, empty, validation, and error
states. Do not leave dead buttons or nonfunctional links.

## 12. Docker and Docker Compose

The development environment must run using Docker Compose.

Services: 1. `frontend`: React/Vite development server or production web
server. 2. `backend`: FastAPI/Uvicorn. 3. `db`: PostgreSQL.

Requirements: - Use a Dockerfile for frontend and backend. - Use a named
Docker volume for PostgreSQL data. - Use a named or bind-mounted volume
for uploaded images. - Configure services through environment
variables. - Add health checks for PostgreSQL and make backend startup
wait for database readiness. - Provide an `.env.example` file with
placeholders, never real secrets. - Add `.dockerignore` and
`.gitignore`. - Ensure the frontend uses a configurable API base URL. -
Ensure browser requests use the correct backend host; do not use the
internal Docker service name as the browser's API hostname. - Configure
CORS for the local frontend origin. - Document database migrations and
initial admin creation. - Do not put real credentials in source control.

Expected developer commands:

``` bash
docker compose up --build
docker compose ps
docker compose logs -f
docker compose down
```

Document that `docker compose down -v` deletes the database volume and
its data.

Expected local development URLs: - Frontend: `http://localhost:5173` (or
the configured frontend port). - Backend: `http://localhost:8000`. - API
docs: `http://localhost:8000/docs`.

## 13. Security and privacy

-   Hash passwords using Argon2 or bcrypt.
-   Never store or return plaintext passwords.
-   Protect all private endpoints.
-   Enforce role permissions on the backend.
-   Validate and sanitize user input.
-   Validate uploaded file content/type and size.
-   Use safe generated filenames.
-   Avoid exposing private proof descriptions, private item details, or
    personal contact details in public API responses.
-   Prevent IDOR by checking ownership for item edits/deletes and claim
    access.
-   Prevent users from approving their own claims.
-   Add basic rate limiting to authentication endpoints if practical.
-   Keep secrets in environment variables.
-   Use transactions for claim approval and item handover.
-   Return generic authentication errors where appropriate.
-   Never trust role values sent by the frontend.

## 14. Smart matching --- optional enhancement

After all core features work, add a basic matching suggestion system
using Python's `difflib` or a similar text-similarity approach.

Compare: - Item title similarity. - Category match. - Location
similarity. - Date proximity.

Example scoring: - Same category: 30 points. - Similar title: up to 40
points. - Same or similar location: 20 points. - Date within three days:
10 points.

Show a possible-match suggestion when the score exceeds a configurable
threshold, such as 60/100. Clearly label results as suggestions, not
confirmed matches. Do not automatically approve claims or reveal private
details.

## 15. Testing requirements

Backend tests: - Registration and login. - Password hashing. -
Role-based authorization. - Student cannot access admin APIs. - Create,
read, update, and delete own item. - Student cannot edit another user's
item. - Public browse hides unapproved listings. - Search and filters. -
Image validation. - Claim submission. - Duplicate claim prevention. -
Claim approval/rejection. - Item return workflow. - Notification
creation and read state.

Frontend checks: - Forms validate required fields. - Loading/error/empty
states display correctly. - Protected routes work. - API errors are
shown clearly. - Search and filters update results. - Image upload
works. - Admin controls are visible only to admins.

End-to-end demonstration: 1. Register two student accounts. 2. Log in as
student A and report a found item. 3. Log in as admin and approve the
listing. 4. Log in as student B and submit a claim with proof. 5. Log in
as admin and review/approve the claim. 6. Record the handover. 7. Verify
the item is returned and notifications are visible.

## 16. Documentation and deliverables

Create a useful `README.md` containing: - Project overview. -
Features. - Technology stack. - Architecture overview. - Folder
structure. - Prerequisites. - Environment setup. - Docker startup
instructions. - Database migration instructions. - Admin account
creation instructions. - Frontend and API URLs. - Test commands. -
Troubleshooting. - Demo workflow.

Also provide: - `.env.example` - `docker-compose.yml` - Backend and
frontend Dockerfiles. - Alembic migrations. - Backend tests. - Seed
script for categories and a safe initial admin setup. - API
documentation through FastAPI. - A concise explanation of database
tables and relationships.

------------------------------------------------------------------------

# PART B --- INITIAL ANTIGRAVITY PROMPT

Copy the prompt below into Google Antigravity after opening a new, empty
project folder named `college-lost-found`.

## Initial prompt

You are acting as a senior full-stack software engineer, solution
architect, UI/UX designer, and testing engineer. Help me build a
complete college mini-project named **College Lost & Found Portal**.

I am a BTech Computer Science student and a beginner/intermediate
developer. Explain important decisions in simple language, but write
clean, maintainable, professional code.

### Mandatory technology stack

-   Frontend: React with Vite.
-   Backend: Python with FastAPI.
-   Database: PostgreSQL.
-   ORM: SQLAlchemy 2.x.
-   Migrations: Alembic.
-   Authentication: JWT and secure password hashing using Argon2 or
    bcrypt.
-   API validation: Pydantic v2.
-   Containerization: Docker and Docker Compose.
-   Styling: Tailwind CSS or clean modular CSS.
-   Icons: Lucide React.

Do not replace this stack with Flask, Django, MongoDB, Firebase, PHP, or
another framework/database unless I explicitly approve the change.

### Product to build

Build a centralized college Lost & Found Portal. Students can register,
report lost items, report found items, upload photographs, browse and
search listings, submit ownership claims, and track claim progress.
Administrators can moderate listings, review claims, manage users, and
record successful item handovers.

This must be a fully functional full-stack application, not just a
visual prototype.

### First task: inspect and plan before coding

Before writing application code:

1.  Inspect the current workspace and identify whether it is empty or
    already contains files.
2.  Read all project instructions and existing files.
3.  Create a concise implementation plan.
4.  Propose the final folder structure.
5.  Explain the architecture: React frontend → FastAPI backend →
    PostgreSQL database.
6.  Identify the main database tables and relationships.
7.  List the main frontend pages and backend API groups.
8.  Identify important security and privacy rules.
9.  Break implementation into small phases with clear completion
    criteria.

Do not start by generating the entire application in one giant code
dump. First provide the plan and folder structure, then begin
implementation phase by phase.

### Required implementation phases

**Phase 1 --- Project foundation** - Create frontend and backend
folders. - Initialize React with Vite. - Initialize FastAPI. - Add
configuration and environment variable handling. - Add Dockerfiles and
Docker Compose. - Add PostgreSQL service and persistent volume. -
Confirm all services start.

**Phase 2 --- Database** - Configure SQLAlchemy and PostgreSQL. - Create
models for users, categories, items, claims, and notifications. -
Configure Alembic migrations. - Add constraints, indexes, and
relationships. - Seed initial categories. - Provide a safe admin
creation method.

**Phase 3 --- Authentication** - Registration and login. - Secure
password hashing. - JWT authentication. - Current-user endpoint. -
Student and admin roles. - Protected frontend routes. - Backend
role-based authorization.

**Phase 4 --- Frontend foundation** - Create responsive landing page. -
Create login and registration pages. - Create student layout and
dashboard. - Create admin layout and dashboard. - Add reusable
components and API client. - Add loading, empty, success, and error
states.

**Phase 5 --- Lost and Found listings** - Create lost-item form. -
Create found-item form. - Implement image upload and validation. -
Implement item listing and detail pages. - Implement edit/delete with
ownership checks. - Implement search, filters, sorting, and
pagination. - Implement admin listing approval/rejection.

**Phase 6 --- Claims** - Implement claim submission. - Keep ownership
proof private. - Prevent duplicate active claims and self-claims. -
Implement admin review and approval/rejection. - Implement handover
completion. - Update item and claim statuses consistently. - Add
notifications for relevant events.

**Phase 7 --- Admin and notifications** - Admin statistics from real
database data. - User management and account suspension. - Listing
moderation. - Claim management. - Category management. - In-app
notifications and unread count.

**Phase 8 --- Optional enhancements** - Add basic possible-item matching
using Python text similarity. - Add analytics charts. - Improve
accessibility and responsive behavior. - Add optional QR code support
only after the main system works.

**Phase 9 --- Testing and finalization** - Write backend tests. - Test
student/admin permissions. - Test the full claim and return workflow. -
Test image uploads. - Test Docker startup and persistent database
data. - Fix errors. - Complete README and setup documentation.

### Important business rules

1.  Only approved listings are visible in public browse/search results.
2.  Students can modify only their own eligible listings.
3.  Students cannot access admin APIs.
4.  A student cannot claim their own found item.
5.  Prevent duplicate active claims by the same user for the same item.
6.  Ownership proof and private item-identifying details must never
    appear in public API responses.
7.  Only an admin can approve/reject claims and record the final
    handover.
8.  Approval and completed handover are different states.
9.  Use separate fields for listing moderation status, item lifecycle
    status, and claim status.
10. Create notifications when important listing or claim events occur.
11. Validate all permissions and business rules in the backend, not only
    in React.
12. Use database transactions when changing related item and claim
    states.

### UI/UX expectations

Create a polished, modern, professional college web application.

Use: - A clean white/light-gray background. - Navy or blue primary
color. - Subtle accent colors. - Consistent spacing and typography. -
Rounded cards and restrained shadows. - Responsive desktop, tablet, and
mobile layouts. - Clear Lost and Found status badges. - Attractive item
cards with images. - Accessible forms and buttons. - Toast or inline
success/error feedback. - Useful empty states and loading indicators.

Do not make the UI look like a generic unstyled admin template. Keep the
experience consistent across all pages.

### Code quality rules

-   Use a clear, modular folder structure.
-   Keep API routes separate from database models and business logic.
-   Use Pydantic schemas for request/response validation.
-   Use SQLAlchemy relationships correctly.
-   Use environment variables for configuration and secrets.
-   Include `.env.example`, `.gitignore`, and `.dockerignore`.
-   Never commit real secrets or passwords.
-   Do not hardcode dashboard statistics or pretend API calls succeeded.
-   Do not leave nonfunctional buttons or fake forms.
-   Do not use localStorage as a replacement for the database.
-   Handle errors gracefully.
-   Add comments only where they improve understanding.
-   Avoid unnecessary abstractions and dependencies.

### How you must work with me

I will use Antigravity to build and test the application. I need you to
work incrementally.

For every phase:

1.  State what you are about to implement.
2.  Inspect existing files before modifying them.
3.  Create or modify only the necessary files.
4.  Explain important files and decisions briefly.
5.  Run relevant checks or tests where possible.
6.  Report the exact commands to run.
7.  Tell me what successful output or behavior I should expect.
8.  List any remaining issues honestly.
9.  Do not claim a feature is complete unless it has been implemented
    and checked.

If an error occurs: - Read the actual error and inspect the relevant
code. - Identify the root cause. - Make the smallest appropriate fix. -
Re-run the relevant test or command. - Do not rewrite unrelated working
modules.

Preserve existing working code. Before changing a shared configuration
or database schema, explain the impact. Do not delete project files or
database data without asking me.

### Definition of done

The project is complete only when:

-   A student can register and log in.
-   A student can report lost and found items.
-   Images can be uploaded and displayed.
-   Listings can be searched and filtered.
-   Students can submit claims.
-   Admins can review and decide claims.
-   Admins can record successful handovers.
-   Notifications are persisted and displayed.
-   Admin and student permissions are enforced by the backend.
-   PostgreSQL stores the application data persistently.
-   The complete application starts through Docker Compose.
-   The documented end-to-end demonstration workflow works.
-   The README explains how another person can run the project.

### Start now

Begin with **Phase 1 planning only**.

Inspect the workspace, propose the architecture and folder structure,
list the implementation phases and completion criteria, and identify any
assumptions. Do not generate the entire project at once. After
presenting the plan, wait for my approval before making the initial
project files.

------------------------------------------------------------------------

# PART C --- FOLLOW-UP PROMPTS FOR ANTIGRAVITY

Use these prompts one at a time after the initial planning stage.

## Prompt 1 --- Approve project foundation

I approve the proposed architecture. Implement Phase 1 only. Create the
React/Vite frontend, FastAPI backend, Dockerfiles, Docker Compose,
environment example, and basic health-check endpoints. Start the
services and verify that the frontend and backend are reachable. Do not
implement all business features yet.

## Prompt 2 --- Database

Implement Phase 2. Configure PostgreSQL, SQLAlchemy, and Alembic. Create
the users, categories, items, claims, and notifications models with
appropriate relationships, constraints, and indexes. Create and run
migrations. Add a safe category seed and admin setup command. Test
database connectivity.

## Prompt 3 --- Authentication

Implement Phase 3. Build registration, login, JWT authentication, secure
password hashing, current-user endpoint, role-based backend
dependencies, and protected React routes. Test both student and admin
access. Never trust a role sent by the frontend.

## Prompt 4 --- Lost and Found

Implement Phase 5 after the frontend foundation is ready. Build lost and
found item creation, image uploads, listing moderation, item details,
search, filters, pagination, and owner-only editing/deletion. Connect
every feature to PostgreSQL through the FastAPI APIs.

## Prompt 5 --- Claims and handover

Implement the complete claims workflow. Add private ownership proof,
duplicate-claim prevention, admin review, approve/reject, handover
completion, correct state transitions, database transactions, and
notifications. Test the complete workflow with two student accounts and
one admin.

## Prompt 6 --- Final audit

Audit the entire application against the project context. Identify
nonfunctional buttons, missing API connections, security problems,
broken permissions, incomplete database operations, Docker problems, and
missing tests. Fix issues in priority order. Run the full test suite and
document the actual results. Do not claim success for checks that were
not run.

------------------------------------------------------------------------

# PART D --- PROJECT RULES AND IMPORTANT NOTES

## Keep this file in the project

Save this document as:

`ANTIGRAVITY_PROJECT_CONTEXT.md`

Keep it in the root folder of the project. Ask Antigravity to read it
before each major implementation phase.

## Recommended workflow

1.  Create a new folder named `college-lost-found`.
2.  Save this context file in that folder.
3.  Open the folder in Antigravity.
4.  Paste the Initial Antigravity Prompt from Part B.
5.  Review and approve the proposed plan.
6.  Continue using the follow-up prompts in Part C.
7.  Run and test the project after every phase.
8.  Keep the README updated as the project develops.

## Important beginner advice

Do not try to implement every optional feature immediately. First
complete the core journey:

**Register → Login → Report Found Item → Admin Approves → Another
Student Claims → Admin Verifies → Item Returned.**

Once this works reliably, add search improvements, notifications,
charts, and smart matching.

The most important measure of success is a working, secure, demonstrable
application---not the number of features or the size of the codebase.
