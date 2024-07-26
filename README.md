# Search Extension
#### Video Demo: [<URL HERE>](https://youtu.be/ryHUz7JrBw0)
#### Description:

This project is a Chrome extension that allows users to search for a specific phrase on the current web page and highlight occurrences of that phrase. The extension also offers navigation controls to move between occurrences. This README provides an overview of the project components, their functionalities, and the design decisions made during development.

### Project Components

1. **manifest.json**:
   - This is the configuration file for the Chrome extension. It contains metadata such as the extension's name, description, version, and permissions. The manifest also specifies the background scripts and content scripts used by the extension.
   - Key details:
     - `manifest_version`: 3
     - `name`: "Search Extension"
     - `description`: "Search for a specific phrase on the current page."
     - `version`: "1.0"
     - `permissions`: ["activeTab"]
     - `background`: Specifies `background.js` as the service worker.
     - `content_scripts`: Includes `content.js` to run on all URLs.
     - `action`: Defines the popup interface located in `extension/extension.html` with appropriate icons.

2. **background.js**:
   - This script runs in the background and handles the lifecycle events of the extension. It ensures that the search functionality is available as long as the extension is active.

3. **content.js**:
   - This script is injected into web pages to execute the core functionality of the extension. It searches for a specified phrase, highlights occurrences, and manages navigation between found phrases.
   - Key functionalities:
     - Listens for messages (`search`, `next`, `prev`) from the popup interface.
     - Searches and highlights text on the page using the `highlightText` and `highlightMatch` functions.
     - Maintains the current index of highlighted occurrences and updates highlights accordingly.
     - Sends information to the popup about the number of occurrences and the current highlighted occurrence.

4. **extension.html**:
   - This is the HTML file for the popup interface of the extension. It contains the search input field, search button, result display, and navigation buttons (previous and next).
   - Key elements:
     - Input field for entering the search phrase.
     - Button to initiate the search and navigate to previous and next occurrences.
     - Results display area to show the number of found occurrences and the current highlighted occurrence.

5. **extension.css**:
   - This stylesheet defines the styling for the popup interface. It ensures a clean and user-friendly design with appropriate spacing, fonts, and colors.
   - Key styles:
     - Background color, font, and shadow for the popup.
     - Styling for the input field, buttons, and result display.
     - Hover effects and transitions for buttons to enhance user experience.

6. **extension.js**:
   - This script handles the interaction between the popup interface and the content script. It listens for user inputs, sends messages to `content.js`, and updates the results display.
   - Key functionalities:
     - Clears previous search results and initializes the search field on load.
     - Sends `search`, `next`, and `prev` messages to `content.js` based on user actions.
     - Updates the results display with the number of found occurrences and the current highlighted occurrence.

### Design Decisions

1. **Manifest Version 3**: The extension uses manifest version 3, which offers better security and performance features compared to previous versions. This decision ensures future compatibility and adherence to the latest standards.

2. **User Interface**: The popup interface is designed to be simple and intuitive, allowing users to quickly perform searches and navigate results without a learning curve. The use of navigation buttons and clear feedback on the number of occurrences enhances usability.

3. **Highlighting Occurrences**: The decision to highlight occurrences in orange and the current occurrence in yellow ensures users can easily distinguish between all occurrences and the current highlighted one. This visual feedback is crucial for effective navigation.

4. **Smooth Scrolling**: During navigation between occurrences, the script uses smooth scrolling to bring the highlighted occurrence into view. This improves the user experience by providing a seamless transition between occurrences.

5. **Performance Considerations**: The `highlightText` function is designed to minimize performance impact by processing only text nodes and creating document fragments for efficient DOM manipulation.

In summary, this Chrome extension provides a robust and user-friendly solution for searching and highlighting text on web pages. The design decisions and implementation details ensure it is both effective and efficient, offering a valuable tool for users who need to quickly find and navigate specific phrases in their browser.

### Steps to Launch the Extension
1. Open Chrome and go to `chrome://extensions/`.
2. Enable "Developer mode" in the top right corner.
3. Click "Load unpacked" and select your project directory (e.g., search-extension).

The extension should now appear in the list of installed extensions. Click the extension icon in the toolbar to see the popup and test its functionality.