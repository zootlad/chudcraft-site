async function updateLastCommitDate() {
    try {
        const response = await fetch('https://api.github.com/repos/zootlad/chudcraft-site/commits');
        const commits = await response.json();
        if (commits.length > 0) {
            const lastCommitDate = new Date(commits[0].commit.author.date);
            
            // Format the date
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const month = months[lastCommitDate.getMonth()];
            const day = lastCommitDate.getDate();
            const year = lastCommitDate.getFullYear();
            
            // Add ordinal suffix to day
            const ordinal = (day) => {
                if (day > 3 && day < 21) return 'th';
                switch (day % 10) {
                    case 1: return 'st';
                    case 2: return 'nd';
                    case 3: return 'rd';
                    default: return 'th';
                }
            };

            const formattedDate = `${month} ${day}${ordinal(day)} ${year}`;
            
            // Update the CSS custom property
            document.documentElement.style.setProperty('--last-update-date', `'Last Updated: ${formattedDate}'`);
        }
    } catch (error) {
        console.error('Error fetching commit date:', error);
        // Fallback date in case of error
        document.documentElement.style.setProperty('--last-update-date', "'Last Updated: Jan 3rd 2025'");
    }
}

// Call the function when page loads
updateLastCommitDate();
        async function updateLastCommitDate() {
    try {
        const response = await fetch('https://api.github.com/repos/zootlad/chudcraft-site/commits');
        const commits = await response.json();
        if (commits.length > 0) {
            const lastCommitDate = new Date(commits[0].commit.author.date);
            
            // Format the date
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const month = months[lastCommitDate.getMonth()];
            const day = lastCommitDate.getDate();
            const year = lastCommitDate.getFullYear();
            
            // Add ordinal suffix to day
            const ordinal = (day) => {
                if (day > 3 && day < 21) return 'th';
                switch (day % 10) {
                    case 1: return 'st';
                    case 2: return 'nd';
                    case 3: return 'rd';
                    default: return 'th';
                }
            };

            const formattedDate = `${month} ${day}${ordinal(day)} ${year}`;
            
            // Update the CSS custom property
            document.documentElement.style.setProperty('--last-update-date', `'Last Updated: ${formattedDate}'`);
        }
    } catch (error) {
        console.error('Error fetching commit date:', error);
        // Fallback date in case of error
        document.documentElement.style.setProperty('--last-update-date', "'Last Updated: Jan 3rd 2025'");
    }
}

// Call the function when page loads
updateLastCommitDate();


        document.addEventListener('DOMContentLoaded', () => {
            const cards = document.querySelectorAll('.mod-card');
            
            cards.forEach(card => {
                card.addEventListener('mousemove', e => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = -(y - centerY) / 25;
                    const rotateY = (x - centerX) / 25;
                    
                    requestAnimationFrame(() => {
                        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    });
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'rotateX(0) rotateY(0)';
                });
            });
        });