/**
 * BMORE Foodies Component Loader
 * Automatically injects head, nav, and footer
 */

function loadComponent(id, file, isHead = false) {
    const el = document.getElementById(id);
    
    // Only fetch if the placeholder exists on the current page
    if (!el) return;

    fetch(file)
        .then(response => {
            if (!response.ok) throw new Error(`Could not find ${file}`);
            return response.text();
        })
        .then(data => {
            if (isHead) {
                // Injects metadata, GA4, and CSS into the actual <head>
                document.head.insertAdjacentHTML('beforeend', data);
                el.remove(); // Clean up placeholder
            } else {
                // Replaces placeholder div with the actual HTML component
                el.outerHTML = data;
            }
        })
        .catch(err => console.error("Component Loader Error:", err));
}

// Execute the loads when the script runs
loadComponent('head-placeholder', 'head-template.html', true);
loadComponent('nav-placeholder', 'nav.html');
loadComponent('footer-placeholder', 'footer.html');