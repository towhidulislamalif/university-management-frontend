# University Management Dashboard (Frontend)

The University Management Dashboard is a frontend solution designed for administrators, faculty, and students. It offers a user-friendly interface that enables easy management of user records, course schedules, and more. With a responsive frontend, it ensures smooth operations and user experience.

## Note

##### The admin has the authority to create teacher and student profiles, along with other university management tasks. When an admin creates a teacher, the Teacher ID is generated based on the sequence of creation. For example, the first teacher's ID would be F-0001, the second teacher's ID would be F-0002, and so on. It is important to note that the default password is set to 'teacher123' for each created teacher. When a teacher logs in with their credentials (like ID: F-0001 and password: 'teacher123'), the system automatically redirects them to the change password route. When the admin creates a student, the ID is set based on the year (such as '2024') followed by the semester code (like '01') and a four-digit serial number (like '0001'). So, the full ID would be '2024010001'. The default password for each student is set as 'student123'. When a student logs in with their credentials, the system automatically redirects them to the change password route.

##### [Live Link](https://university-management-frontend-alpha.vercel.app/)

## Getting Started

Follow these instructions to set up the University Management Dashboard frontend on your local machine for development and testing purposes.

### Prerequisites

Ensure you have the following software installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/towhidulislamalif/university-management-frontend
   ```

2. Navigate to the project directory:

   ```bash
   cd project-directory
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure the application settings:

   - Rename .env.example to .env.
   - Update .env with your connection URI and other pertinent configurations.

## Running

To run the application, execute the following command:

```bash
npm start
```

or

```bash
npm run dev
```

## Built With

- [React](https://react.dev/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
- [Redux Toolkit](https://redux-toolkit.js.org/) - State management for JavaScript applications

## Authors

- **Touhidul Islam Alif** - _Initial work_ - [GitHub](https://github.com/towhidulislamalif)

Feel free to reach out for any further assistance or queries regarding the University Management Dashboard setup.
