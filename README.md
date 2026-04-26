# Lab 6

* *Date Created*: 08 04 2026
* *Last Modification Date*: 10 04 2026
* *Lab Netlify URL*: https://www.yacoubacamara.com/
* *Lab Gitlab URL*: https://git.cs.dal.ca/ycamara/csci3172.git
* *Lab GitHub URL*: https://github.com/YacoubaCamara/portfolio.git


## Authors

If what is being submitted is an individual Lab or Assignment, you may simply include your name and email address. Otherwise list the members of your group.

* [Yacouba Camara](yc256080@dal.ca) - (Author)

## Built With

* [React](https://react.dev/) - Used to build the user interface and manage component-based architecture
* [Vite](https://vite.dev/) - Development server and build tool for fast frontend development
* [Bootstrap](https://getbootstrap.com/) - Used for responsive layout and styling
* [Netlify](https://www.netlify.com/) - Deployment platform and hosting
* [Netlify Functions](https://docs.netlify.com/functions/overview/) - Used to handle backend logic such as form submissions and protected message retrieval
* [Netlify Blobs](https://docs.netlify.com/storage/blobs/) - Used to store and retrieve contact form submissions
* [OpenWeather API](https://openweathermap.org/api) - Used to fetch real-time weather data
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Programming language used for application logic
* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) - Used for structuring web pages
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - Used for styling the application

## Artificial Intelligence Tools Used
* [ChatGPT](https://chat.openai.com/) - Used for debugging and fixing code issues
* [Claude](https://claude.ai/) - Used for improving code structure and API handling

### Example Prompt


How can I securely use an API key without exposing it in the frontend?


The prompt above was used with ChatGPT and Claude to generate the code below:


const apiKey = process.env.WEATHER_API_KEY;


#### File Name
*netlify/functions/weather.js*


const apiKey = process.env.WEATHER_API_KEY;


- The code was implemented in a Netlify function.
- The code was used to keep the API key secure.
- The code was slightly modified to fit the project.

### Example Prompt


How do I protect a route so only authorized users can access it?


The prompt above was used with ChatGPT and Claude to generate the code below:


if (authHeader !== Bearer ${process.env.ADMIN_KEY}) {
return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
}


#### File Name
*netlify/functions/messages.js*


if (authHeader !== Bearer ${process.env.ADMIN_KEY}) {
return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
}


- The code was implemented in a Netlify function.
- The code was used to protect access to messages.
- The code was slightly modified to match the project.

---

### Example Prompt


How do I fetch data from a Netlify function in React?


The prompt above was used with ChatGPT and Claude to generate the code below:


const response = await fetch("/.netlify/functions/weather");
const data = await response.json();


#### File Name
*src/components/WeatherWidget.jsx


const response = await fetch("/.netlify/functions/weather");
const data = await response.json();


- The code was implemented in a React component.
- The code was used to retrieve data from a Netlify function.
- The code was slightly modified to fit the component logic.

### Example Prompt


How can I move API calls from the frontend to a Netlify function to avoid exposing keys?


The prompt above was used with [Claude](https://claude.ai/) to generate the code below:


const response = await fetch(/.netlify/functions/weather?lat=${lat}&lon=${lon});


#### File Name
*src/components/WeatherWidget.jsx


const response = await fetch(/.netlify/functions/weather?lat=${lat}&lon=${lon});


- The code was implemented in the WeatherWidget component.
- The code was used to call a backend function instead of exposing the API key in the frontend.
- The code was slightly modified to include latitude and longitude parameters.

## Testing

Manual testing was done to make sure the main features of the portfolio work as expected.

### Manual Test Cases

- **T1 – Home page: Open the site locally or deployed → Page loads and shows main content → Loaded correctly (Pass)

- **T2 – Navigation: Click through all navbar links → Each page loads properly → All links worked (Pass)

- **T3 – Responsive navbar: Resize browser to mobile size → Navbar collapses and opens correctly → Worked as expected (Pass)

- **T4 – About page: Open About page → Content and skills are displayed → Displayed correctly (Pass)

- **T5 – Projects page: Open Projects page → Projects show name, author, languages, description → Data displayed correctly (Pass)

- **T6 – Empty form validation: Submit empty contact form → Errors show for required fields → Errors displayed (Pass)

- **T7 – Invalid email: Enter wrong email format → Error message appears → Validation worked (Pass)

- **T8 – Valid submission: Submit valid form → Form submits and success message appears → Submitted successfully (Pass)

- **T9 – Messages protection: Go to `/messages` without access (you need the environment variables) → Page is accessible in the navbar unless you have the environment variables → Access denied (Pass)

- **T10 – Messages display: Access `/messages` with access → Messages show correctly → Messages displayed (Pass)

- **T11 – Weather widget: Allow location access → Weather info loads → Loaded correctly (Pass)

- **T12 – Weather denied: Deny location access → Error message appears → Error shown (Pass)

- **T13 – Media: Check images/videos/icons → All media loads correctly → No issues (Pass)

- **T14 – Alt text: Inspect images → Images include alt text → Present (Pass)

- **T15 – Contrast: Check readability → Text is readable on all pages → Looks good (Pass)

### Test Environment

- Browser: Google Chrome  
- OS: macOS  
- Local: Vite / Netlify Dev  
- Deployment: Netlify  

### Summary

The app was tested manually by going through each page and feature. Navigation, forms, protected routes, and API integrations all worked as expected. No major issues were found during testing.

## Acknowledgments

https://www.kylieying.com/index.html: Used for inspiration
