
const GROQ_API_KEY = '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';
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export interface ItineraryRequest {
  destination: string;
  days: number;
  interests: string;
  groupSize: string;
}

export interface ItineraryResponse {
  title: string;
  description: string;
  days: Array<{
    day: number;
    title: string;
    activities: string[];
    highlights?: string[];
    meals?: string[];
    accommodation?: string;
    tips?: string[];
    budget?: {
      low: number;
      medium: number;
      high: number;
    };
  }>;
}

export const generateItinerary = async (request: ItineraryRequest): Promise<ItineraryResponse> => {
  const prompt = `Create a detailed ${request.days}-day travel itinerary for ${request.destination}, Gujarat, India. 

Target Group: ${request.groupSize}
Interests: ${request.interests}

IMPORTANT: Each day must be COMPLETELY DIFFERENT with unique activities. Do not repeat activities across days.

Day Structure Requirements:
- Day 1: Arrival and local orientation, heritage sites, local markets
- Day 2: Cultural immersion, handicraft workshops, village experiences  
- Day 3: Nature and adventure activities, outdoor experiences
- Day 4: Spiritual and religious sites, meditation, local festivals
- Day 5: Food tours, cooking classes, agricultural experiences
- Day 6: Wildlife, nature reserves, eco-tourism
- Day 7: Shopping, final cultural experiences, departure

For each day provide SPECIFIC and UNIQUE:
1. Morning activities (different each day)
2. Afternoon experiences (varied and specific)
3. Evening entertainment (unique cultural activities)
4. Local food specialties to try
5. Specific places to visit with exact names
6. Cultural insights and local customs
7. Budget breakdown (accommodation, food, activities, transport)
8. Practical tips specific to that day's activities

Focus on:
- Authentic Gujarat village experiences
- Local handicrafts and artisan workshops
- Traditional festivals and celebrations
- Rural tourism and agro-tourism
- Heritage architecture and archaeological sites
- Wildlife and nature experiences
- Local cuisine and cooking traditions
- Community interactions and cultural exchanges

Make each day's activities completely distinct and progressively showcase different aspects of Gujarat culture.

Format as JSON:
{
  "title": "Comprehensive ${request.days}-Day ${request.destination} Cultural Journey",
  "description": "An immersive exploration of ${request.destination}'s rich heritage, traditions, and rural charm",
  "days": [
    {
      "day": 1,
      "title": "Arrival & Heritage Discovery",
      "activities": ["Specific morning activity", "Unique afternoon experience", "Evening cultural activity"],
      "highlights": ["Specific landmark 1", "Specific landmark 2"],
      "meals": ["Local breakfast specialty", "Traditional lunch dish", "Regional dinner"],
      "accommodation": "Specific type of lodging recommendation",
      "tips": ["Practical tip 1", "Cultural tip 2"],
      "budget": {"low": 1500, "medium": 3000, "high": 5000}
    }
  ]
}`;

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are an expert travel planner specializing in Gujarat, India with deep knowledge of rural tourism, cultural heritage, local traditions, and hidden gems. You create detailed, day-by-day itineraries with completely unique activities for each day. Never repeat activities across different days. Focus on authentic, immersive experiences that showcase different aspects of Gujarat culture each day.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 4000,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No content received from AI');
    }

    // Try to parse the JSON response
    try {
      const itinerary = JSON.parse(content);
      return itinerary;
    } catch (parseError) {
      console.warn('Could not parse JSON response, creating structured response');
      return createEnhancedItinerary(content, request);
    }
  } catch (error) {
    console.error('Error generating itinerary:', error);
    return createEnhancedItinerary('', request);
  }
};

const createEnhancedItinerary = (content: string, request: ItineraryRequest): ItineraryResponse => {
  const dayThemes = [
    {
      title: "Arrival & Heritage Discovery",
      activities: [
        `Explore ${request.destination} heritage sites and monuments`,
        `Visit traditional handicraft workshops and artisan quarters`,
        `Evening cultural performance and local cuisine introduction`
      ],
      highlights: ["Historic Architecture", "Local Craftsmanship", "Cultural Welcome"],
      meals: ["Traditional Gujarati breakfast thali", "Local street food lunch", "Welcome dinner with folk music"],
      tips: ["Dress modestly for heritage sites", "Carry camera for architecture", "Learn basic Gujarati greetings"]
    },
    {
      title: "Village Immersion & Crafts",
      activities: [
        `Participate in traditional pottery or textile workshops`,
        `Visit rural village communities and farming activities`,
        `Evening storytelling session with village elders`
      ],
      highlights: ["Artisan Workshops", "Rural Life Experience", "Community Stories"],
      meals: ["Farm-fresh breakfast", "Village-style lunch with locals", "Traditional dinner around bonfire"],
      tips: ["Participate respectfully in village activities", "Support local artisans", "Carry mosquito repellent"]
    },
    {
      title: "Nature & Adventure",
      activities: [
        `Early morning bird watching and nature photography`,
        `Trekking or desert safari adventures`,
        `Sunset viewing from scenic viewpoints`
      ],
      highlights: ["Wildlife Spotting", "Adventure Activities", "Natural Beauty"],
      meals: ["Packed breakfast for trek", "Picnic lunch in nature", "Campfire dinner under stars"],
      tips: ["Wear comfortable trekking shoes", "Carry plenty of water", "Respect wildlife and environment"]
    },
    {
      title: "Spiritual & Wellness",
      activities: [
        `Visit ancient temples and meditation centers`,
        `Participate in yoga and wellness sessions`,
        `Evening aarti and spiritual discussions`
      ],
      highlights: ["Sacred Sites", "Meditation Experience", "Spiritual Learning"],
      meals: ["Sattvic breakfast", "Temple prasad lunch", "Simple vegetarian dinner"],
      tips: ["Remove shoes in temples", "Maintain silence during meditation", "Dress conservatively"]
    },
    {
      title: "Culinary & Agricultural Tour",
      activities: [
        `Cooking classes with local families`,
        `Visit organic farms and agricultural processes`,
        `Food market tours and spice education`
      ],
      highlights: ["Cooking Workshop", "Farm Experience", "Local Markets"],
      meals: ["Cook your own breakfast", "Farm-to-table lunch", "Multi-course dinner feast"],
      tips: ["Ask about ingredients and recipes", "Support organic farmers", "Try regional specialties"]
    },
    {
      title: "Wildlife & Eco-Tourism",
      activities: [
        `Wildlife sanctuary visits and safaris`,
        `Bird watching and nature conservation learning`,
        `Evening eco-lodge activities and stargazing`
      ],
      highlights: ["Wildlife Safari", "Conservation Learning", "Night Sky Observation"],
      meals: ["Early safari breakfast", "Eco-lodge lunch", "Outdoor barbecue dinner"],
      tips: ["Follow wildlife guidelines", "Maintain distance from animals", "Support conservation efforts"]
    },
    {
      title: "Shopping & Cultural Farewell",
      activities: [
        `Shopping for handicrafts and local specialties`,
        `Final cultural site visits and photography`,
        `Farewell dinner with cultural performances`
      ],
      highlights: ["Handicraft Shopping", "Cultural Memories", "Farewell Celebration"],
      meals: ["Local breakfast favorites", "Street food tour lunch", "Grand farewell dinner"],
      tips: ["Bargain respectfully at markets", "Keep receipts for handicrafts", "Exchange contact with new friends"]
    }
  ];

  return {
    title: `${request.days}-Day ${request.destination} Complete Cultural Experience`,
    description: `An immersive journey through ${request.destination}, Gujarat, showcasing diverse aspects of local culture, heritage, and traditions with unique experiences each day.`,
    days: Array.from({ length: request.days }, (_, i) => {
      const theme = dayThemes[i % dayThemes.length];
      return {
        day: i + 1,
        title: `Day ${i + 1}: ${theme.title}`,
        activities: theme.activities,
        highlights: theme.highlights,
        meals: theme.meals,
        accommodation: i === 0 ? `Heritage hotel or traditional guesthouse in ${request.destination}` : undefined,
        tips: theme.tips,
        budget: { 
          low: 1200 + (i * 100), 
          medium: 2500 + (i * 200), 
          high: 4500 + (i * 300) 
        }
      };
    })
  };
};
