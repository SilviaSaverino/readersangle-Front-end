# Readers's angle:

'Reader's angle' website project had been created as a final portfolio project for Code Institute full stack course.

For the frontend part of the project, I chose to use React to develop a dynamic and engaging user interface. My goal was to provide readers with a seamless and intuitive experience that allows them to explore, engage, and connect with the vibrant literary community.

Using React, I crafted various components that work together harmoniously to create an interactive and visually appealing interface. I wanted readers to feel immersed in the world of books and easily connect with other book enthusiasts. By utilizing React's capabilities, I aimed to deliver a user-friendly interface that makes it effortless for readers to navigate, discover new books, and engage with the content.

It was important to me to provide a user experience that feels smooth, natural, and enjoyable, allowing readers to fully immerse themselves in the website and connect with fellow book lovers.

## Project Goals:

- Provide an intuitive and user-friendly platform for readers to share their thoughts, opinions, and recommendations on books.

- Create a vibrant literary community where users can engage with each other's posts, fostering discussions and interactions around various books.

- Implement comprehensive CRUD functionality to allow users complete control over their interactions, including creating, reading, updating, and deleting their posts.

- Enable users to leave detailed reviews for specific books, offering valuable feedback and insights to other readers.

- Facilitate a personalized and meaningful reading experience by allowing users to express their liking for posts.

- Incorporate social features, such as the ability to like/unlike posts and reviews, to encourage engagement and interaction among users.

- Allow users to explore other users' profiles to discover their book recommendations and connect with like-minded readers.

- Lay a solid foundation for future development, enabling the addition of new features and enhancements to further enhance the reading and community experience on the website. Such as
  - 1. let users indicate their reading intentions (whether they have read a book or plan to read it).
  - 2. let users follow/unfollow a post so to stay engaged with the post discussion.

## Agile development:

# Sprints, Epics and User Stories:

## Sprint1 - Navigation & Authentication:
During this sprint, the focus will be on implementing the navigation system and user authentication functionality within the project.

### Seamless Navigation and Secure Authentication:
This epic focuses on providing users with a seamless navigation experience throughout the website, along with robust authentication functionalities to ensure secure access to user accounts and features. It includes the implementation of a persistent menu bar, efficient page routing without full page reloads, user sign-up and sign-in capabilities, logged-in status indication, token refreshing for uninterrupted sessions, conditional rendering based on login status, and the display of user avatars for identification purposes.

#### Navigation: 
As a user, I want to see a menu bar on every page so that I can easily move around different parts of the website without any difficulty.

#### Routing: 
As a user, I want to navigate through pages quickly without the need for the entire page to reload, so that I can smoothly view the content without any interruptions.

#### Authentication - Sign up: 
As a user, I want to create a new account so that I can access all the features that are available to registered users.

#### Authentication - Sign in: 
As a user, I want to log in to the application so that I can access the functionalities and features that are only available to logged-in users.

#### Authentication - Logged in Status: 
As a user, I want to know if I am currently logged in or not, so that I can take appropriate actions like logging in if needed.

#### Authentication - Refreshing access tokens: 
As a user, I want to stay logged in until I decide to log out, so that I can have a seamless user experience without constantly needing to re-authenticate.

#### Navigation - Conditional rendering:
As a user who is not logged in, I want to see options for signing in and signing up, so that I can easily create a new account or access my existing account.

#### Avatar: 
As a user, I want to see profile pictures or avatars of other users, so that I can easily identify and recognize different users within the application.

## Sprint2 - Posts & Posts functionality:
During this sprint, the focus will be on implementing the posts CRUD functionalities, and also some extra functionalities such as liking or for future release: following a post.

### Adding & Liking, Marking and Following Posts:
This epic focuses on enhancing user engagement and interaction within the application by allowing logged-in users to create and share their own posts, view detailed information about individual posts, express appreciation by liking and following posts that they find interesting, and mark posts as 'Read' or 'Will Read'.

#### Create posts: 
As a user who is logged in, I can easily create and share my own posts with others, allowing me to showcase my content to the world.

#### View a post: 
As a user, I can access and explore the specific details of an individual post, enabling me to gather more information and insights about it.

#### Like a post: 
As a logged-in user, I have the ability to express my appreciation and support for posts that catch my interest by liking them, indicating my positive response to the content.

#### Mark a post: 
As a logged-in user, I have the ability to mark a post as 'Read' or 'Will read' so that i can keep track of my readings

#### Follow a post: 
As a logged-in user, I can follow a post so that i stay enganged with discussion/reviews development

## Sprint3 - Posts:
This sprint will focus on improving how posts are shown to users. There will also be added a search bar to help users find specific posts quickly. Additionally, interactive features like liking, commenting, etc will be introduced to make the platform more engaging and fun to use.

### The posts page:
This epic focuses on enhancing the user experience on the Posts page by providing features such as viewing the most recent posts, searching for posts and user profiles, accessing liked posts, viewing posts marked as read or will read, and implementing infinite scroll functionality to enable seamless browsing without the need for manual page navigation.

#### View most recent posts: 
As a user, I can easily access and browse through the latest posts, arranged in order of their creation, ensuring that I stay updated with the most recent content.

#### Search for posts: 
As a user, I have the capability to search for posts and user profiles using specific keywords, enabling me to find the posts and users that align with my interests.

#### View liked posts: 
As a logged-in user, I can conveniently access and view the posts that I have liked, allowing me to revisit and enjoy the content that resonates with me the most.

#### View posts marked as Read or Will Read: 
As a logged-in user, I can explore and see the posts i've marked as read or will read, ensuring that I stay organized and up-to-date with my reading preferences.

#### Infinite scroll: 
As a user, I can effortlessly continue scrolling through the posts on the website, as new posts are automatically loaded for me, eliminating the need to manually click on "next page" or similar buttons.

## Sprint4 - Post page:
This sprint will focus on implementing crud functionalities for the reviews/comment of the posts, and extra funtionalities such as liking reviews.

### The post page:
This epic focuses on enriching the user experience on the Post page by providing features such as accessing the post page to read reviews and discussions, allowing the owner of a post to edit the post's title and description, enabling logged-in users to create and contribute reviews, displaying the review date to provide context, allowing users to like reviews, view reviews from other users, and providing the functionality for the owner of a review to delete or edit their own review.

#### Post page: 
As a user, I can access the post page, enabling me to read the reviews and discussions about the post.

#### Edit and delete post: 
As the owner of a post, I have the ability to delete my post and/or modify the title and description/content of my post. This feature enables me to make corrections or updates to my post even after it has been published.

#### Popular posts: 
As a logged-in user, I can see the most popular posts so that I can stay engaged with relevant discussion/reviews and see what the community likes the most

#### Create a review: 
As a logged-in user, I can contribute by adding reviews to a post. This functionality allows me to share my thoughts and opinions about the post, providing feedback and insights.

#### Review date: 
As a user, I can see the time elapsed since a review was made. This information helps me determine the age of a review and provides context to its relevance within the discussion.

#### View reviews: 
As a user, I can read the reviews posted by other users on a particular post. This allows me to gain insights into the perspectives and opinions shared by the community.

#### Like reviews: 
As a logged-in user, I have the ability to express my appreciation and support for reviews that catch my interest by liking them, indicating my positive response to the content.

#### Delete reviews: 
As the owner of a review, I have the authority to delete my own review. This control empowers me to manage the removal of my review from the application as needed.

#### Edit a review: 
As the owner of a review, I can edit the content of my review. This functionality allows me to modify or update the information within my existing review.

#### Popular post:
As a logged-in user, I can see the most popular posts so that I can stay engaged with relevant discussion/reviews and see what the community likes the most

## Sprint5 - User Profile:
This sprint will focus on the creation of an interface for the user profile,with crud functionalities to allow users to edit their profiles, and with a focus on showing user preferences.

### The Profile Page:
This epic focuses on enhancing the user experience on the Profile page by providing features such as viewing other users' profiles, accessing the list of most followed posts, displaying user statistics, allowing users to follow or unfollow specific posts, exploring all posts by a specific user, enabling the editing of user profiles including profile picture and bio, and providing the functionality to update the username and password for logged-in users.

#### Profile page: 
As a user, I can view other users' profiles to see their posts and learn more about them.

#### Most followed post: 
As a user, I can view a list of the most followed posts, providing me with insights into which posts are popular among the community.

#### User profile - user stats: 
As a user, I can view statistics about a specific user, such as their bio, number of posts, and other relevant information, allowing me to get to know them better.

#### View all posts by a specific user: 
As a user, I can explore all the posts created by a specific user, enabling me to catch up on their latest posts or decide if I want to engage with their content.

#### Edit profile: 
As a logged-in user, I have the ability to edit my profile, which includes changing my profile picture and updating my bio.

#### Update username and password: 
As a logged-in user, I can update my username and password, allowing me to modify my display name and ensure the security of my account.


## Project Planning:

### Mockups:

### Schema:

## Design:

### Colours:

### Fonts:

## Features:

### Homepage:

### Sign In/Up Forms:

### Posts page:

### Profile page:

### Liked page:

## Components:

### Re-use of compoments:

## Hooks and custom hooks:

## Crud functionalities:

## Frameworks, libraries and dependencies:

## Testing:

### Manual testing:

## Validators:

## Bugs and fixes:

## Deployment:

## Credits:

## Acknowledgements:
