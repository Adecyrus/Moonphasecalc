        function calculateMoonPhase() {
            var selectedMonth = document.getElementById("monthSelect").value;
            var selectedDay = document.getElementById("dayInput").value;
            var selectedYear = document.getElementById("yearInput").value;
            var inputDate = selectedYear + "-" + selectedMonth + "-" + selectedDay;
            var unixdate = new Date(inputDate).getTime() / 1000;

            // The duration in days of a lunar cycle
            var lunardays = 29.53058770576;

            // Seconds in lunar cycle
            var lunarsecs = lunardays * (24 * 60 * 60);

            // Date time of first new moon in year 2000
            var new2000 = new Date("2000-01-06T18:14:00Z").getTime() / 1000;

            // Calculate seconds between date and new moon 2000
            var totalsecs = unixdate - new2000;

            // Calculate modulus to drop completed cycles
            var currentsecs = totalsecs % lunarsecs;

            // If negative number (date before new moon 2000) add lunarsecs
            if (currentsecs < 0) {
                currentsecs += lunarsecs;
            }

            // Calculate the fraction of the moon cycle
            var currentfrac = currentsecs / lunarsecs;

            // Calculate days in current cycle (moon age)
            var currentdays = currentfrac * lunardays;

            // Array with start and end of each phase
            var phases = [
                { name: "New Moon", start: 0, end: 1 },
                { name: "Waxing Crescent", start: 1, end: 6.38264692644 },
                { name: "First Quarter", start: 6.38264692644, end: 8.38264692644 },
                { name: "Waxing Gibbous", start: 8.38264692644, end: 13.76529385288 },
                { name: "Full Moon", start: 13.76529385288, end: 15.76529385288 },
                { name: "Waning Gibbous", start: 15.76529385288, end: 21.14794077932 },
                { name: "Last Quarter", start: 21.14794077932, end: 23.14794077932 },
                { name: "Waning Crescent", start: 23.14794077932, end: 28.53058770576 },
                { name: "New Moon", start: 28.53058770576, end: 29.53058770576 }
            ];

            // Find current phase in the array
            var thephase = "";
            for (var i = 0; i < phases.length; i++) {
                if (currentdays >= phases[i].start && currentdays <= phases[i].end) {
                    thephase = phases[i].name;
                    break;
                }
            }

            // Display the result with moon phase images
            var resultDiv = document.getElementById("result");
            resultDiv.innerHTML = "<h2>Calculated moon phase</h2>" +
                "<p>Percentage of lunation: " + ((currentdays / lunardays) * 100).toFixed(3) + "%</p>" +
                "<p>The moon age is: " + currentdays.toFixed(3) + " days</p>" +
                "<p>The moon phase is: " + thephase + "</p>" +
                "<img src='" + getMoonPhaseImage(thephase) + "' alt='" + thephase + "'>";
        }

        function getMoonPhaseImage(phase) {
            var images = {
                "New Moon": "https://emojicdn.elk.sh/🌑",
                "Waxing Crescent": "https://emojicdn.elk.sh/🌒",
                "First Quarter": "https://emojicdn.elk.sh/🌓",
                "Waxing Gibbous": "https://emojicdn.elk.sh/🌔",
                "Full Moon": "https://emojicdn.elk.sh/🌕",
                "Waning Gibbous": "https://emojicdn.elk.sh/🌖",
                "Last Quarter": "https://emojicdn.elk.sh/🌗",
                "Waning Crescent": "https://emojicdn.elk.sh/🌘"
            };

            return images[phase] || "";
        }