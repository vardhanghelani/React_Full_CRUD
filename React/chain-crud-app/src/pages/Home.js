import "./Home.css"
function Home(){
    return(
        <>
        <div className="container">

            <h1>Welcome to Chain-CRUD App</h1>
            <p>This is a simple CRUD (Create, Read, Update, Delete) application using React and Express.js.</p>
            <p>The application uses a MongoDB database to store the data.</p>
            <p>To get started, install the required dependencies by running <code>npm install</code> in the root directory of the project.</p>
            <p>Then, start the development server by running <code>npm start</code>.</p >
            <p>The application will be running on <a href="http://localhost:3000">http://localhost:3000</a>.</p>
            <p>To Get all the Chains present in database vist <a href="/chains">Chains</a> page.</p>
            <p>
                To Get detail of any Specific chain Click on Read more after visiting <a href="/chains">Chains</a>
            </p>
            <p>
                To Add a new chain Click on Add Chain after visiting <a href="/chains">Chains</a>
            </p>
            <p>
                To Update a chain Click on Edit after visiting <a href="/chains">Chains</a>
            </p>
            <p>
                To Delete a chain Click on Delete after visiting <a href="/chains">Chains</a>
            </p>
            <p>
                Note: You need to have MongoDB installed and running for this application to work correctly.
            </p>
            <p>
                For more information, refer to the <a href="https://github.com/vardhanghelani/React_Full_CRUD">GitHub repository</a>.
            </p>
        
        </div>
        </>
    );
}

export default Home;