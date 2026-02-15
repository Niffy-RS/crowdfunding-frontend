Here's a reminder of the required features. Your crowdfunding project must:

- [X] Be separated into two distinct projects: an API built using the Django Rest Framework and a website built using React. 
- [x] Have a cool name, bonus points if it includes a pun and/or missing vowels. See https://namelix.com/ for inspiration. <sup><sup>(Bonus Points are meaningless)</sup></sup>
- [x] Have a clear target audience.
- [x] Have user accounts. A user should have at least the following attributes:
  - [x] Username
  - [x] Email address
  - [x] Password
- [x] Ability to create a “fundraiser” to be crowdfunded which will include at least the following attributes:
  - [x] Title
  - [x] Owner (a user)
  - [x] Description
  - [x] Image
  - [x] Target amount to raise
  - [x] Whether it is currently open to accepting new supporters or not
  - [x] When the fundraiser was created
- [x] Ability to “pledge” to a fundraiser. A pledge should include at least the following attributes:
  - [x] An amount
  - [x] The fundraiser the pledge is for
  - [x] The supporter/user (i.e. who created the pledge)
  - [x] Whether the pledge is anonymous or not
  - [x] A comment to go along with the pledge
- [x] Implement suitable update/delete functionality, e.g. should a fundraiser owner be allowed to update its description?
- [x] Implement suitable permissions, e.g. who is allowed to delete a pledge?
- [x] Return the relevant status codes for both successful and unsuccessful requests to the API.
- [x] Handle failed requests gracefully (e.g. you should have a custom 404 page rather than the default error page).
- [x] Use Token Authentication, including an endpoint to obtain a token along with the current user's details.
- [x] Implement responsive design.

## Additional Notes
No additional libraries or frameworks, other than what we use in class, are allowed unless approved by the Lead Mentor.

Note that while this is a crowdfunding website, actual money transactions are out of scope for this project.

## Submission
To submit, fill out [this Google form](https://forms.gle/34ymxgPhdT8YXDgF6), including a link to your Github repo. Your lead mentor will respond with any feedback they can offer, and you can approach the mentoring team if you would like help to make improvements based on this feedback!

Please include the following in your readme doc:
- [x] A link to the deployed project.
      https://lively-pie-f4bea6.netlify.app/
- [x] A screenshot of the homepage
      <img width="2821" height="1521" alt="Screenshot 2026-02-15 201219" src="https://github.com/user-attachments/assets/3156fc33-23e3-4ffe-9d7b-1382800308e1" />
  User page with no pledges
      <img width="2839" height="1509" alt="Screenshot 2026-02-15 162956" src="https://github.com/user-attachments/assets/658601ae-be67-4cb5-b329-09bcb821c359" />
  User page with pledges
      <img width="2853" height="1525" alt="Screenshot 2026-02-15 201846" src="https://github.com/user-attachments/assets/aef560b8-0796-4fb0-9d92-9dcda1366d2d" />
- [x] A screenshot of the fundraiser creation page
      <img width="2847" height="1540" alt="Screenshot 2026-02-15 195259" src="https://github.com/user-attachments/assets/6fde2de9-0721-4d11-af1d-0be408552c15" />
- [x] A screenshot of the fundraiser creation form
      <img width="2823" height="1519" alt="Screenshot 2026-02-15 163113" src="https://github.com/user-attachments/assets/4624842b-ef9c-4851-b3f9-5bf07cf5b2c2" />
- [x] A screenshot of a fundraiser with pledges
- [x] A screenshot of the resulting page when an unauthorized user attempts to edit a fundraiser (optional, depending on whether or not this functionality makes sense in your app!)
      <img width="2812" height="1510" alt="Screenshot 2026-02-15 162714" src="https://github.com/user-attachments/assets/f79e0dbe-7d61-4acf-ae2d-2044ca42714c" />
