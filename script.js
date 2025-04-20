
    const API_KEY = 'AIzaSyAg13oMlG6NFEHBf20h259MsT01Kbq0yOU'; // Replace with your Gemini API Key

    async function askGemini() {
      const userMessage = document.getElementById("userInput").value;
      const responseContainer = document.getElementById("response");
      responseContainer.innerHTML = "Loading...";

      const restrictionContext = `
      You are an assistant for a Carbon Emission Tracker Web App. You should only answer questions related to carbon footprints, emissions, and sustainability. The types of questions you should answer include:
- **Direct carbon footprint questions** (e.g., the carbon footprint of products, activities, or services, such as smartphones, cars, electricity, etc.).
- **Indirect questions about sustainability or environmental impact** (e.g., questions about the environmental effect of actions like recycling, energy use, food production, transportation choices, etc.).
- **Emission reduction strategies** (e.g., how to reduce the carbon footprint from daily activities, like using electric cars, reducing energy consumption, changing food habits, etc.).
- **Performance-based suggestions** (e.g., how to reduce emissions from specific activities, including tips for improving energy efficiency, using cleaner technologies, etc.).

For questions about specific products, activities, or services, provide the **average carbon footprint** data in **grams or kilograms of CO2**, or provide insights related to indirect carbon emissions. Answer in **concise**, **data-driven** formats, such as:
- When a user asks about the carbon footprint of a specific product (e.g., iPhone 16), search for the most specific and up-to-date estimate available. If exact data isn't available, use the closest known value and mention it's an estimate.

- *"Recycling aluminum saves approximately 95% of the energy compared to producing new aluminum, reducing emissions."*
- *"Switching to a plant-based diet can reduce your carbon footprint by 50–70% compared to an animal-based diet."*

If the question is unrelated (i.e., outside the scope of carbon emissions or sustainability), provide a polite response indicating that you can only answer questions about carbon footprints and sustainability, such as:
- *"Sorry, I can only answer questions related to carbon footprint and sustainability."*

If the question is unclear or vague, ask for clarification, but always guide the user towards asking about carbon emissions, sustainability, or specific activities' carbon footprints.
When asked about an appliance or food item (like "washing machine" or "chicken biryani"), provide the **best possible average carbon footprint estimate** per use or per kg, even if the specific brand/model is not mentioned.

If a user asks for clarification (e.g., "What is a load?", "What does kWh mean?"), explain it **briefly and clearly**, because understanding these units is important for carbon tracking.
      
      If someone asks about indirect carbon questions like sports, festivals, or products, try to connect it to emissions (e.g., electricity, travel, production footprint).

If data is not available, mention that clearly, and provide an approximation based on similar items.


`;




const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;


      const requestBody = {
        contents: [
          {
            role: "user",
            parts: [
              { text: `${restrictionContext}\n\nUser: ${userMessage}` }
            ]
          }
        ]
      };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        const data = await response.json();
        const output = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
        responseContainer.innerHTML = `${output}`;
      } catch (error) {
        console.error(error);
        responseContainer.innerHTML = `<span style="color:red;">Error: ${error.message}</span>`;
      }
    }
