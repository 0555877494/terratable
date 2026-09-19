import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Award, Heart } from 'lucide-react';

export default function ProducerStories() {
  const producers = [
    {
      id: 1,
      name: 'Marco Rossi',
      location: 'Tuscany, Italy',
      specialty: 'Wildflower Honey & Balsamic Vinegar',
      story: 'Third-generation beekeeper and vinegar producer, Marco tends to over 200 beehives in the rolling hills of Tuscany. His family has been perfecting the art of honey production for over 80 years, using traditional methods passed down through generations.',
      image: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=600&fit=crop',
      quote: 'Every jar of honey tells the story of our land and the dedication of our bees.',
      established: '1945'
    },
    {
      id: 2,
      name: 'Yuki Tanaka',
      location: 'Uji, Kyoto, Japan',
      specialty: 'Ceremonial Matcha',
      story: 'Yuki represents the 12th generation of her family to cultivate matcha in the prestigious Uji region. Her tea gardens are shaded for 20 days before harvest, creating the vibrant green color and rich umami flavor that defines true ceremonial-grade matcha.',
      image: 'https://images.unsplash.com/photo-1545513245-1565fef691d3?w=800&h=600&fit=crop',
      quote: 'Matcha is not just tea; it is a meditation, a moment of peace in a busy world.',
      established: '1892'
    },
    {
      id: 3,
      name: 'Ali Rezaei',
      location: 'Khorasan, Iran',
      specialty: 'Premium Saffron',
      story: 'Ali and his family have been cultivating saffron in the ancient lands of Khorasan for five generations. Each autumn, they hand-pick the delicate crimson threads from over 50,000 crocus flowers to produce just one kilogram of the world\'s most precious spice.',
      image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=600&fit=crop',
      quote: 'Saffron is the soul of Persian cuisine, carrying centuries of tradition in every thread.',
      established: '1920'
    },
    {
      id: 4,
      name: 'Maria Santos',
      location: 'Esmeraldas, Ecuador',
      specialty: 'Artisan Dark Chocolate',
      story: 'Maria works directly with small cacao farmers in Ecuador to create bean-to-bar chocolate that honors both tradition and innovation. Her small-batch process preserves the complex flavors of single-origin cacao, resulting in chocolate that tells the story of its terroir.',
      image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=800&h=600&fit=crop',
      quote: 'Chocolate is a journey from bean to bar, and every step matters.',
      established: '2010'
    },
    {
      id: 5,
      name: 'Giuseppe Moretti',
      location: 'Umbria, Italy',
      specialty: 'Truffle-Infused Olive Oil',
      story: 'Giuseppe combines two of Italy\'s greatest treasures: cold-pressed extra virgin olive oil and precious black winter truffles. His family has been pressing olives in Umbria for over a century, and he brings that same passion to creating luxurious truffle oils.',
      image: 'https://images.unsplash.com/photo-1474979266404-7f28a9b0cfdc?w=800&h=600&fit=crop',
      quote: 'The marriage of olive oil and truffle is a celebration of Italian craftsmanship.',
      established: '1925'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm font-semibold mb-4">
          <Heart className="w-4 h-4" />
          Our Producers
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-stone-100 mb-6">
          Meet the <span className="gradient-text">Artisans</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-lg max-w-3xl mx-auto leading-relaxed">
          Behind every product is a story of passion, tradition, and dedication. 
          Meet the talented artisans who bring you the world's finest specialty foods.
        </p>
      </motion.div>

      {/* Producers Grid */}
      <div className="space-y-16">
        {producers.map((producer, index) => (
          <motion.div
            key={producer.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`grid md:grid-cols-2 gap-8 items-center ${
              index % 2 === 1 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
            >
              <img
                src={producer.image}
                alt={producer.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm font-semibold">{producer.location}</span>
                </div>
                <h3 className="font-serif text-3xl font-bold">{producer.name}</h3>
              </div>
            </motion.div>

            {/* Content */}
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-xs font-semibold mb-3">
                  <Award className="w-3 h-3" />
                  Est. {producer.established}
                </div>
                <h4 className="font-semibold text-amber-600 dark:text-amber-400 text-sm uppercase tracking-wider mb-2">
                  {producer.specialty}
                </h4>
              </div>

              <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-lg">
                {producer.story}
              </p>

              <blockquote className="border-l-4 border-amber-500 pl-6 py-2 italic text-stone-600 dark:text-stone-400">
                "{producer.quote}"
              </blockquote>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Shop {producer.name.split(' ')[0]}'s Products
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl p-10 sm:p-16 text-white text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            Discover Our Complete Collection
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Every product in our store comes from passionate artisans like these. 
            Explore our full range of specialty foods.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white text-amber-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
          >
            Shop All Products
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
