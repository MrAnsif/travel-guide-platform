# Travel Guide Platform

A comprehensive travel guide platform providing local area insights, culture data, and safety information to help users understand a place before they arrive.

## Features and Functionality

*   **Destination Search:** Allows users to search for destinations, cities, or countries.
*   **AI-Powered Content Generation:** Generates detailed information about places using AI.
*   **Place Details Page:** Displays overview, culture & etiquette, and safety information for a specific place.
*   **Featured Destinations:** Showcases a selection of featured destinations on the homepage.
*   **Infinite Scroll:** Loads more places as the user scrolls down the "Explore" page.
*   **Theming:** Supports light and dark themes with animated transitions.
*   **API Endpoints:** Provides API endpoints for retrieving place data, searching for places, and generating place data.

## Technology Stack

*   **Next.js:** React framework for building the user interface.
*   **Prisma:** ORM for database interactions.
*   **OpenRouter:** Used as an API for AI content generation.
*   **use-debounce:** Custom hook from npm libraries to prevent API spamming
*   **swr & useSWRInfinite:** React Hooks for Data Fetching
*   **Nominatim (OpenStreetMap):** Geocoding service for validating place names.
*   **Unsplash API:** For fetching place images.
*   **Tailwind CSS:** CSS framework for styling the application.
*   **Lucide React:** Icon library.
*   **Recharts:** Charting library.

## Prerequisites

*   Node.js (>=18)
*   npm or yarn
*   PostgreSQL database
*   OpenAI API key (for AI content generation)
*   Unsplash API access key (for fetching place images)

## Installation Instructions

1.  Clone the repository:

    ```bash
    git clone https://github.com/MrAnsif/travel-guide-platform.git
    cd travel-guide-platform
    ```

2.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  Set up your environment variables:

    *   Create a `.env.local` file in the root directory.
    *   Add the following variables:

        ```
        DATABASE_URL="your_postgresql_connection_string"
        OPENAI_API_KEY="your_openai_api_key"
        UNSPLASH_ACCESS_KEY="your_unsplash_access_key"
        VERCEL_URL="your_vercel_url" # only needed when deployed on Vercel
        ```

4.  Run Prisma migrations:

    ```bash
    npx prisma migrate dev
    # or
    yarn prisma migrate dev
    ```

5.  Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Usage Guide

1.  **Homepage:**

    *   Use the search bar to find destinations.
    *   Browse featured destinations.

2.  **Explore Page:**

    *   Use the search bar to filter destinations.
    *   Scroll down to load more destinations.

3.  **Place Details Page (e.g., `/place/shinjuku-tokyo-japan`):**

    *   View overview information, including location, population, and travel information.
    *   Explore culture and etiquette guidelines.
    *   Review safety information, including crime rates and recommendations.
    *   Use the tab navigation to switch between sections.

## API Documentation

### Available Endpoints:

*   **`GET /api/places`**: Retrieves a paginated list of places.

    *   **Query Parameters:**

        *   `page` (optional): Page number (default: 1).
        *   `limit` (optional): Number of places per page (default: 20, max: 50).
        *   `cursor` (optional): Cursor for pagination.

    *   **Example:** `/api/places?page=2&limit=10&cursor=some_id`

*   **`GET /api/places/{slug}`**: Retrieves a specific place by its slug.

    *   **Example:** `/api/places/shinjuku-tokyo-japan`

*   **`GET /api/places/featuredPlace`**: Retrieves a list of featured places.

    *   **Query Parameters:**
        *   `limit` (optional): Number of featured places to retrieve (default: 6).
    *   **Example:** `/api/places/featuredPlace?limit=3`

*   **`POST /api/places/generate`**: Generates and saves place data using AI.

    *   **Request Body:**

        ```json
        {
          "placeName": "Destination Name",
          "placeDetails": "Optional Details"
        }
        ```

    *   **Example:**
        ```json
        {
            "placeName": "New York City",
            "placeDetails": "A vibrant metropolis"
        }
        ```

*   **`GET /api/search`**: Searches for places based on a query.

    *   **Query Parameters:**

        *   `q` (required): Search query.
        *   `limit` (optional): Maximum number of results to return (default: 10).

    *   **Example:** `/api/search?q=tokyo&limit=5`

*   **`GET /api/test`**: Test endpoint. (For Development Purposes)

### Response Format:

All API endpoints return JSON responses.

Example for `/api/places` (paginated list):

```json
{
  "places": [
    {
      "id": "place_id_1",
      "slug": "shinjuku-tokyo-japan",
      "name": "Shinjuku",
      "state": null,
      "country": "Japan",
      "placeType": "neighborhood",
      "overviewThumbnail": "https://example.com/shinjuku.jpg",
      "aiContent": {
        "generatedDescription": "Shinjuku is a vibrant neighborhood in Tokyo..."
      }
    },
    // ... more places
  ],
  "pagination": {
    "totalCount": 100,
    "totalPages": 10,
    "currentPage": 1,
    "hasNextPage": true,
    "hasPrevPage": false,
    "nextCursor": "place_id_10"
  }
}
```

## Contributing Guidelines

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Test your changes thoroughly.
5.  Submit a pull request.

## License Information

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact/Support Information

*   **Repository URL:** [https://github.com/MrAnsif/travel-guide-platform](https://github.com/MrAnsif/travel-guide-platform)
*   **Developer:** MrAnsif - [https://github.com/MrAnsif](https://github.com/MrAnsif)
*   For support or inquiries, please open an issue on the GitHub repository.