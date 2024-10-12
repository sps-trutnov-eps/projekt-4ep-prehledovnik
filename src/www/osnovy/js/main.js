async function CreateNewCurriculum() {
    event.preventDefault(); // Prevent default form submission
	
	try {
        const response = await fetch('/osnovy/create', {
            method: 'POST'
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

async function SaveCurriculum(event, id) {
    event.preventDefault(); // Prevent default form submission
	
	try {
        const formData = new FormData(event.target);
        const data = new URLSearchParams(formData);
		
        const response = await fetch(`/osnovy/save/${id}`, {
            method: 'POST',
			headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
			},
            body: data,
        });

        // Check if response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
		
        // Parse JSON response
        const jsonResponse = await response.json();
        console.log(jsonResponse); // Handle your JSON data here

        // Redirect after handling
		/*if (jsonResponse.id == undefined){
			window.location.href = `/osnovy`;
		}*/
		
        window.location.href = `/osnovy/${jsonResponse.id}`;
    } catch (error) {
        console.error('Error:', error);
    }
}