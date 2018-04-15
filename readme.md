# OH NO!

![:image](https://media.giphy.com/media/mDh73MB4yiUEw/giphy.gif)

It just so happens that all of the wizards of consequence in the magic world have been students of the Hogwarts School of Witchcraft and Wizardry, however the school has lost all its magic and now NOTHING WORKS!

As a member of Dumbledore's Army it's up to YOU to set up some ingenious Muggle gadgetry to keep the school up and running!

> Reparo!

## Learning Objectives

- Practicing setting up databases
- Learning to set up test databases and testing commands within them
- Practicing integrating SQL into Express apps using the PG-Promise package
- Practicing displaying templated data in RESTful routes
- Learning to implement CRUD apps in Express
- Learning to use Ajax to implement put and delete HTTP actions

---

## Completion

You've been provided with a a data set from which you will build an Express app according the the prompts. For the first few parts, when you can display all the houses and students and view their pictures you'll know things are working properly.

By the end of Wednesday, you will be in a good position if you complete up to (and including) **part 5**. After that includes some topics we will cover tomorrow.

---

## Setup

### Part 1 - Setting up your DB

1. Start by creating a database by running `createdb hogwarts_crud` in terminal.

2. In `db/seeds.sql` add CREATE TABLE methods for both the houses and the students tables.

    The houses table should have:
     - id
     - name
     - img_url

    The students table should have:
     - id
     - fname
     - lname
     - image
     - house_id (this should be set up as a foreign key!!!)

3. Then seed the database by running: `psql -d hogwarts_crud -f db/seeds.sql`

4. It may be helpful to create a test database so you can practice editing and deleting data from tables, then setting the same seed data as your 'live' database.

    1. `createdb hogwarts_crud_test`
    2. `psql -d hogwarts_crud_test -f seed.sql`

 **Now you can test commands and mess with tables to your hearts content in your own little sandbox. Think of it as your own little [room of requirement.](http://harrypotter.wikia.com/wiki/Room_of_Requirement)**


### Part 2 - Set up your file structure

Use `mkdir` and `touch` to create your file structure.

Your `views` folder that will hold all of your html templates. Inside of `views` you should have 3 folders:
 - home/
 - houses/
 - students/

 You will also want the `students` and `houses` folders to both have their own `index.ejs` and `show.ejs` files. The `index.ejs` will display all of the data while the `show.ejs` file will show individual results.

 Inside of the `home` directory, add an `index.ejs` file. This will be the file you use for `/` route responses in your app. 
 Where the `index` page shows all the students, and the `show` page displays an individual student .

 Your tree inside of the `views` folder should look like this:

```
├── home
│   └── index.ejs
├── houses
│   ├── index.ejs
│   └── show.ejs
└── students
    ├── index.ejs
    └── show.ejs
```

---

## Assignment

### Part 1 - Accio Students! - Reading

You will need to build route for `/`in your `index.js` file. It should render your `views/home/index.ejs` file and should have links to the `/students` and the `/houses` routes.

Next you will need to build out the controller `/students`. In this controller set up a route that renders the `students/index.ejs` view with the appropriate data. The data here is a list of all students from Hogwarts. You will have to create a function in your model to query the database using a PG connection to get all student info, and supply it to the view.

In the view, iterate over all of the student names and create a link to their specific profile on the page. 
> The `id` and the `fname`/`lname` should dynamically be generated in ejs from each student's hash

**Testing Queries** If you're unsure about which queries to use, this is a good time to go into the test database and figure out what commands you can use.

### Part 2 - Accio *Individual* Students! - Reading

In your `students` controller, write out the route handler for `/students/:id` to the html template `view/students/show.ejs`. It should ask the model for the individual student based off of the `id` parameter given.

The `student` model should have a function that will return the promise for the individual student

In the view create a div with the class "student" that contains an h1 tag and an img tag. In the h1 tag, put the student's full name. In the img tag, put the student's `image` value from the database.

### Part 3 - Accio Houses! - Reading

Students of Hogwarts are split into separate houses. Create the route handler and controller for `/houses`.

The controller should have a route that renders from the `views/houses/index.ejs` file. It will ask the model to query the database for all houses then send that data with the view render.

The model will have a function to return a promise that will retrieve all of the houses.

In the view iterate over the houses. Each iteration will create a div on the page with class "house", that contains an h2, and an img tag. The h2 tag should be dynamically populated to create a link to the house by its id. The img tag should contain the img url obtained from the database.

### Part 4 - Accio All Students from a House - More Reading

You've shown the houses together, but the house heads need a list of all of the students they are in charge of. Build a dynamic route in your `houses` controller for `/houses/:id` that will ask the model to query the database for all the students in the given house based on the house id. It will then render the `views/houses/show.ejs` view with the data.

In the model create a function that will return a promise to get all students whose `house_id` value matches `:id` supplied by the route call.

In the view, show the house sigil by displaying the house and img in a div with the class "house". Below the house div, create a new div and give it the CSS class "roster". Inside this div, iterate over your students collection, which creates a div with the CSS class "student", that contains an h1 with the student's name, and an img tag that displays the student's photo.

### Part 5 - Updating the Students list

Update your `/students` page so that each students name has next to it another link to their affiliated house. ***HINT*** Look at the routes to access each house. Do they match up with the student's house_id?

### Part 6 - Expecto Patronum - Creation

`HINT` - You may need the `body-parser` package.

Create a new view in the `views/students` directory called `new.ejs`. In this view create a form tag that sends a POST request to `/students`. This form must ask for a first name, last name, image url, and a dropdown list of available houses. You'll have to query the database for each house.

In your `students` controller create a new `get` route to `/new` that renders the view you just created, along with a list of all the houses. **HINT**: you may need to access your `houses` model!

Drop downs are done with the `<select>` tag, and can be populated with `<option>` tags. You will iterate over the houses from your query inside the select tag to create them. 

Create a new `post` route in your `students` controller. When a post request is sent to `/students`, it should take the values from the form and save them to the `hogwarts_crud` table.

In your model, create the appropriate query that will return a promise to `insert` the data to the table. You can look at the student table's schema in `seeds.sql` to see what values are required. How would you set form inputs as required to prevent the form from submitting?

Save the return value of the query you wrote and use it to redirect the user to the newly created student's id. By default you get back an empty PG::Request object, but by using the [RETURNING](http://www.postgresql.org/docs/8.3/static/sql-insert.html) keyword, you can get back the new student's id.

Add a link in your `home/index.ejs` to create a new student!


## BONUS

- **Styling** As usual! Make it look pretty.

- Add a sorting hat method so that when a new student is created they are randomly assigned to one of Hogwarts' four houses. (Where do you think this logic should go? Use your judgement).

**HINT:** Check out the [npm method-override](https://www.npmjs.com/package/method-override) for the bonus section!

### Part 7 - Avada Kedavra - Destroy

In your student view, create a button to delete the student. Create a javascript file in your `public` directory and link it to your view. In that file, send a DELETE request to `/students/:id`. When the call is done, [redirect](https://developer.mozilla.org/en-US/docs/Web/API/Window/location) the viewer to the `/students` page.

In your `students` controller. Create a `delete` route that when a request is made to `/students/:id` it will call on your model to delete the student, then `send` a confirmation that the student was deleted.

In your `students` model. Create a `delete` function that will return a promise to delete the student from the table.


### Part 8 - Riddikulus - Update

In each student's individual page add a link to `/students/:id/edit`, with `:id` being their id number from the database. In the `views/students` directory, create a `edit.ejs` view. This page should contain a form that let's us change all of the student's information except their id ( looks **awful similar** to the student creation form...).

In the `students` controller. Set up a `get` route to `/students/:id/edit` that will render the student's edit page. Query the database for the student's info, and use it to set the default values of this form.

Then set up a `put` route to `/students/:id`. When a request is made to this route it should get the new values for the student and send it to the model to update the information. It should then respond with a confirmation that the student was updated.

In the `students` model. Create a function that will return a promise to update the student information.

In your `public` js file add an event listener to when the edit form is submitted. It should then get the values from each of the inputs and send a `PUT` request to `/students/:id` to edit the student's data. When the Ajax call is done, redirect the viewer to the student's show page.
## 🚀 Homework Submission:

Homework is due by **11:00PM Sunday April 15th**! Remember to work with each other and go to TAs when you need it. 

Completion, comfort, wins, losses, questions... you know the drill.

Remember to include a link to your **repo**.

### Exit Tickets
**WDI-Rover-Opportunity**🔴

https://docs.google.com/forms/d/13hbOOxPfeeJzyg-Jc_Cx2VWnTvTH7xB8tLKV0MLU6KI/edit

**WDI-Rover-Spirit** 🔵

https://goo.gl/forms/OajGUqQ4nrljHPxP2
