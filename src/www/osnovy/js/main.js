async function CreateNewCurriculum() {
    event.preventDefault(); // Prevent default form submission
	
	try {
        const response = await fetch('/osnovy/create', {
            method: 'POST',
            body: 'hi',
        });

        // Check if response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse JSON response
        const jsonResponse = await response.json();
        console.log(jsonResponse); // Handle your JSON data here

        // Redirect after handling
        window.location.href = `/osnovy/${jsonResponse.id}`;
    } catch (error) {
        console.error('Error:', error);
    }
}