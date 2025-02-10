# NorthBay Salary Calculator

A comprehensive salary calculation tool designed specifically for NorthBay Solutions Pakistan employees. This application helps employees calculate their take-home salary, manage allowances, and understand tax implications.

## Overview

The NorthBay Salary Calculator provides accurate calculations for:
- Monthly take-home salary
- Tax deductions based on latest FBR slabs
- Provident Fund contributions
- Various allowances including fuel, medical, internet, and gym

## Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ahtasham-nbs/salary-tool.git
cd salary-tool
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Key Features Explained

### Tax Calculation
- Implements latest FBR tax slabs for 2024-25
- Automatically calculates monthly
- Includes 10% tax-free component

### Provident Fund
- Optional 5% PF deduction
- Integrated into final salary calculation

### Allowances Management
- Fuel allowance with quantity and price calculations
- Medical allowance tracking
- Internet allowance management
- Gym allowance support

## Project Structure
```
├── app/                  # Next.js app directory
│   ├── about/           # About page
│   ├── changelog/       # Changelog page
│   ├── faq/            # FAQ page
│   └── page.tsx        # Home page
├── components/          # Reusable components
├── types/              # TypeScript definitions
└── utils/              # Utility functions
```

## Technology Stack
- Next.js 15.1.0
- React 19.0.0
- TypeScript
- Tailwind CSS
- Framer Motion

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For support, please contact [ahtasham.abbas@northbaysolutions.net](mailto:ahtasham.abbas@northbaysolutions.net)

## Deployment

The application is deployed on Vercel. For deployment instructions, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## FAQ

For frequently asked questions, please refer to the [FAQ page](https://nbs-salary-tool.vercel.app/faq).

## Changelog

View our [changelog](https://nbs-salary-tool.vercel.app/changelog) to stay updated with the latest improvements and features.