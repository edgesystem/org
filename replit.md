# Org Panel - FiveM Organization Management Dashboard

## Overview

This is an organization management panel for GTA RP FiveM servers using QBCore framework. The system provides a complete dashboard for managing criminal/legitimate organizations including member management, banking operations, farm tracking, recruitment, and security (blacklist) features.

The project consists of:
- **Frontend**: React/Vite NUI (Native UI) that renders inside FiveM
- **Backend**: Lua server scripts using ox_lib callbacks and oxmysql for database operations
- **Database**: MySQL with custom org_* tables plus integration with existing QBCore player tables

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, built using Vite
- **Styling**: Tailwind CSS v4 with custom dark theme optimized for gaming UI
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: React hooks (useState, useEffect) with custom `useOrgData` hook for centralized data fetching
- **NUI Communication**: Custom `fetchNui` utility that posts to FiveM's NUI callback system

### Backend Architecture  
- **Runtime**: Lua running on FiveM server
- **Callback System**: ox_lib for structured client-server communication
- **Database**: oxmysql for async MySQL queries
- **Permission System**: Custom helpers (`GetOrgName`, `HasOrgPermission`) reading from player job/gang JSON fields
- **Data Sources**: 
  - `players` table (citizenid, charinfo JSON, job/gang JSON, money JSON)
  - `tokyo_qjobsystem` (shared JSON array with job/gang definitions, grades, permissions)
  - Custom `org_*` tables for panel-specific data

### Data Flow Pattern
1. NUI sends POST request to `https://{resourceName}/{eventName}`
2. Client Lua receives NUI callback, calls `lib.callback` to server
3. Server Lua validates permissions, queries database via oxmysql
4. Response flows back through callback chain to React state

### Key Data Tables
- `org_accounts` - Organization bank balance
- `org_transactions` - Transaction history (deposits/withdrawals)
- `org_farm_progress` - Daily farm progress per player
- `org_farm_settings` - Farm goals and reward configuration
- `org_bans` - Blacklisted members

### Current Integration Status
**Fully Implemented (Real Data)**:
- Organization info (name, label, balance, grade, permissions)
- Bank operations (deposit/withdraw with bankAuth permission check)
- Transaction history
- Farm configuration and progress tracking
- Member grade changes, recruitment, banning

**Still Using Mock Data**:
- Member online status (always shows false)
- Delivery/farm counts per member
- Recruitment statistics
- Player mugshot photos
- Real-time updates (requires manual refresh)

## External Dependencies

### FiveM Framework
- **QBCore**: Player management framework providing job/gang system
- **ox_lib**: Callback system and UI utilities
- **oxmysql**: Async MySQL driver for FiveM
- **ox_inventory**: Referenced for item tracking (not directly modified by panel)

### Database
- **MySQL**: Primary data store accessed via oxmysql
- Integrates with existing `players` table (QBCore standard)
- Uses `tokyo_qjobsystem` for job/gang metadata (custom resource)

### Frontend Dependencies
- React 18 with react-dom
- Vite for build tooling
- Tailwind CSS v4 for styling
- Radix UI component primitives
- Recharts for data visualization
- Lucide React for icons