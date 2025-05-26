
import React, { useState } from 'react';
import { Star, Users, MessageSquare, ThumbsUp, Plus, Send } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  date: string;
  village: string;
  review: string;
  likes: number;
  helpful: number;
}

interface NewReview {
  name: string;
  location: string;
  rating: number;
  village: string;
  review: string;
}

const CommunityReviews = () => {
  const [activeTab, setActiveTab] = useState('reviews');
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState<NewReview>({
    name: '',
    location: '',
    rating: 5,
    village: '',
    review: ''
  });

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Priya Patel",
      location: "Ahmedabad",
      rating: 5,
      date: "2 days ago",
      village: "Hodka Village",
      review: "An incredible experience! The mud houses and traditional crafts were amazing. The local family was so welcoming and taught us about their culture. આ એક અવિસ્મરણીય અનુભવ હતો!",
      likes: 12,
      helpful: 8
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Mumbai",
      rating: 4,
      date: "1 week ago",
      village: "Mandvi Beach Village",
      review: "Beautiful coastal village with pristine beaches. The fishing community shared their daily routines with us. Highly recommended for nature lovers. દરિયાકિનારાનું સુંદર ગામ!",
      likes: 18,
      helpful: 15
    },
    {
      id: 3,
      name: "Sarah Johnson",
      location: "USA",
      rating: 5,
      date: "2 weeks ago",
      village: "Bhujodi Village",
      review: "As an international tourist, I was blown away by the handicraft traditions. The weaving demonstrations were fascinating! ગુજરાતની કલા અદ્ભુત છે!",
      likes: 25,
      helpful: 22
    }
  ]);

  const localTips = [
    {
      id: 1,
      author: "Kiran Bhai",
      role: "Local Guide",
      tip: "Best time to visit Kutch villages is during Rann Utsav (December-February). The weather is perfect and cultural events are at their peak. રણ ઉત્સવ દરમિયાન આવવાનું શ્રેષ્ઠ છે.",
      category: "Timing",
      votes: 34
    },
    {
      id: 2,
      author: "Meera Ben",
      role: "Village Elder",
      tip: "Always remove shoes before entering traditional mud houses. It's a sign of respect in our culture. માટીના ઘરમાં જતાં પહેલાં જૂતા ઉતારો.",
      category: "Etiquette",
      votes: 28
    },
    {
      id: 3,
      author: "Harsh Patel",
      role: "Tourism Officer",
      tip: "Carry cash as most rural areas don't have card payment facilities. ATMs are available in nearby towns. રોકડ રાખો કારણ કે ગ્રામ્ય વિસ્તારોમાં કાર્ડ પેમેન્ટ ઉપલબ્ધ નથી.",
      category: "Practical",
      votes: 41
    }
  ];

  const popularDestinations = [
    "Hodka Village", "Mandvi Beach", "Bhujodi Village", "Kutch Region", "Gir National Park",
    "Dwarka", "Somnath", "Champaner", "Saputara", "Ahmedabad"
  ];

  const handleSubmitReview = () => {
    if (!newReview.name || !newReview.village || !newReview.review) {
      alert('Please fill in all required fields');
      return;
    }

    const review: Review = {
      id: reviews.length + 1,
      name: newReview.name,
      location: newReview.location || 'Not specified',
      rating: newReview.rating,
      date: 'Just now',
      village: newReview.village,
      review: newReview.review,
      likes: 0,
      helpful: 0
    };

    setReviews([review, ...reviews]);
    setNewReview({
      name: '',
      location: '',
      rating: 5,
      village: '',
      review: ''
    });
    setShowAddReview(false);
  };

  const likeReview = (id: number) => {
    setReviews(reviews.map(review => 
      review.id === id 
        ? { ...review, likes: review.likes + 1 }
        : review
    ));
  };

  const markHelpful = (id: number) => {
    setReviews(reviews.map(review => 
      review.id === id 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const renderRatingSelector = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i + 1}
        onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
        className="focus:outline-none"
      >
        <Star
          className={`w-6 h-6 ${
            i < newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          } hover:text-yellow-400 transition-colors`}
        />
      </button>
    ));
  };

  return (
    <section id="community" className="py-20 px-4 bg-gradient-to-br from-orange-50 to-teal-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Community Insights • સમુદાયિક અંતર્દૃષ્ટિ
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Real experiences from travelers and wisdom from locals • પ્રવાસીઓના વાસ્તવિક અનુભવો અને સ્થાનિકોની શાણપણ
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'reviews'
                  ? 'bg-gradient-to-r from-orange-500 to-teal-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <MessageSquare className="inline-block w-5 h-5 mr-2" />
              Reviews • સમીક્ષાઓ
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'tips'
                  ? 'bg-gradient-to-r from-orange-500 to-teal-500 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Users className="inline-block w-5 h-5 mr-2" />
              Local Tips • સ્થાનિક ટિપ્સ
            </button>
          </div>
        </div>

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {/* Add Review Button */}
            <div className="text-center mb-6">
              <button
                onClick={() => setShowAddReview(true)}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Plus className="inline-block w-5 h-5 mr-2" />
                Add Your Review • તમારી સમીક્ષા ઉમેરો
              </button>
            </div>

            {/* Add Review Form */}
            {showAddReview && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Share Your Experience • તમારો અનુભવ શેર કરો
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Your Name • તમારું નામ"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="p-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Your Location • તમારું સ્થાન"
                    value={newReview.location}
                    onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                    className="p-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div className="mb-4">
                  <select
                    value={newReview.village}
                    onChange={(e) => setNewReview({ ...newReview, village: e.target.value })}
                    className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Select Destination • ગંતવ્ય પસંદ કરો</option>
                    {popularDestinations.map((dest) => (
                      <option key={dest} value={dest}>{dest}</option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                    Rating • રેટિંગ
                  </label>
                  <div className="flex items-center space-x-1">
                    {renderRatingSelector()}
                  </div>
                </div>

                <textarea
                  placeholder="Share your experience... • તમારો અનુભવ શેર કરો..."
                  value={newReview.review}
                  onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
                  className="w-full p-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white h-32 resize-none mb-4"
                />

                <div className="flex space-x-3">
                  <button
                    onClick={handleSubmitReview}
                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-teal-600 transition-all duration-300"
                  >
                    <Send className="inline-block w-4 h-4 mr-2" />
                    Submit • સબમિટ કરો
                  </button>
                  <button
                    onClick={() => setShowAddReview(false)}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    Cancel • રદ કરો
                  </button>
                </div>
              </div>
            )}

            {/* Reviews List */}
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {review.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {review.location} • {review.date}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center mb-1">
                      {renderStars(review.rating)}
                    </div>
                    <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                      {review.village}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {review.review}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => likeReview(review.id)}
                      className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{review.likes}</span>
                    </button>
                    <button
                      onClick={() => markHelpful(review.id)}
                      className="text-sm text-gray-400 dark:text-gray-500 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                    >
                      {review.helpful} found helpful
                    </button>
                  </div>
                  
                  <button className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium">
                    Reply • જવાબ આપો
                  </button>
                </div>
              </div>
            ))}

            <div className="text-center">
              <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                Load More Reviews • વધુ સમીક્ષાઓ લોડ કરો
              </button>
            </div>
          </div>
        )}

        {/* Local Tips Tab */}
        {activeTab === 'tips' && (
          <div className="space-y-6">
            {localTips.map((tip) => (
              <div
                key={tip.id}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      {tip.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {tip.author}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {tip.role}
                      </p>
                    </div>
                  </div>
                  
                  <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm font-medium">
                    {tip.category}
                  </span>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {tip.tip}
                </p>

                <div className="flex items-center justify-between">
                  <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span className="text-sm">{tip.votes} votes</span>
                  </button>
                  
                  <button className="text-sm text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium">
                    Thank Local
                  </button>
                </div>
              </div>
            ))}

            <div className="bg-gradient-to-r from-orange-100 to-teal-100 dark:from-orange-900/20 dark:to-teal-900/20 rounded-2xl p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Share Your Local Knowledge • તમારું સ્થાનિક જ્ઞાન શેર કરો
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Help fellow travelers with your insights about Gujarat's villages • ગુજરાતના ગામો વિશે તમારી આંતરદૃષ્ટિ સાથે સાથી પ્રવાસીઓને મદદ કરો
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-orange-500 text-white rounded-xl font-semibold hover:from-teal-600 hover:to-orange-600 transition-all duration-300">
                Add a Tip • ટિપ ઉમેરો
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommunityReviews;
