# Overview

XSS Arsenal is a professional payload repository for Cross-Site Scripting (XSS) testing and education. The application provides a comprehensive collection of XSS payloads extracted from security resources like PortSwigger's cheat sheet, organized with detailed categorization, browser compatibility information, and interactive features for security professionals and researchers.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The application follows a vanilla JavaScript Single Page Application (SPA) pattern with a modular class-based structure:

- **Main Application Class**: `XSSArsenal` class handles all application logic including payload management, filtering, search, and UI interactions
- **Component-Based UI**: Modular components for payload cards, filters, search functionality, and modal dialogs
- **Event-Driven Architecture**: Uses event listeners and debounced input handling for responsive user interactions
- **State Management**: Client-side state management for filters, pagination, theme preferences, and alert protection settings

## Data Structure

- **Payload Objects**: Each XSS payload contains structured data including event type, description, HTML tags, code examples, browser compatibility matrix, category classification, and payload variations
- **Browser Compatibility**: Systematic tracking of Chrome, Firefox, and Safari support for each payload
- **Category System**: Organized classification system (no-interaction, animation-events, etc.) for payload types

## User Interface Design

- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox layouts
- **Theme System**: Dark theme with neon green accent colors using CSS custom properties
- **Interactive Elements**: Copy-to-clipboard functionality, expandable payload cards, filtering system, and search capabilities
- **Accessibility Features**: ARIA labels, keyboard navigation support, and semantic HTML structure

## Security Features

- **Alert Protection**: Built-in popup blocking system to prevent unwanted alert() executions while browsing payloads
- **Safe Payload Display**: Code syntax highlighting without execution for secure payload viewing
- **User Controls**: Toggle mechanisms for enabling/disabling protection features

# External Dependencies

## CSS Framework

- **Font Awesome 6.4.0**: Icon library loaded via CDN for UI icons and visual elements

## No Backend Dependencies

The application is designed as a static frontend-only solution with no server-side components, databases, or external API integrations. All data is embedded within the JavaScript payload files, making it suitable for offline use and simple deployment scenarios.