import { useState, useEffect } from 'react';
import { Search, Filter, Loader2, Sparkles } from 'lucide-react';
import instrumentsData from '../data/instrumentsData';
import InstrumentCard from '../components/Instruments/Instrumentscard';
import InstrumentModal from '../components/Instruments/InstrumentModal';

function Instruments() {
  const [instruments, setInstruments] = useState([]);
  const [filteredInstruments, setFilteredInstruments] = useState([]);
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
 
  useEffect(() => {
  setLoading(true);

  // Set instruments directly from local data
  setInstruments(instrumentsData);

  // Extract unique categories
  const uniqueCategories = Array.from(
    new Set(instrumentsData.map((inst) => inst.category))
  ).sort();
  setCategories(uniqueCategories);

  setLoading(false);
  }, []);


  useEffect(() => {
    let filtered = instruments;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((inst) => inst.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (inst) =>
          inst.name.toLowerCase().includes(query) ||
          inst.description.toLowerCase().includes(query) ||
          inst.manufacturer?.toLowerCase().includes(query) ||
          inst.category.toLowerCase().includes(query) ||
          inst.model_number?.toLowerCase().includes(query)
      );
    }

    setFilteredInstruments(filtered);
  }, [selectedCategory, instruments, searchQuery]);

 function TypewriterText({ text = '', speed = 70 }) {
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!text) return;
   
    setDisplayedText(''); // Reset for new text
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [text, speed]);

  return <span>{displayedText}{showCursor && '|'}</span>;
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] -z-10"></div>

      <header className="relative bg-white/80">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-cyan-600/5 to-blue-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-0">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                 <TypewriterText text="Explore our state-of-the-art scientific instruments and equipments..." />
              </h1>
              
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 py-3">
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Section */}
           <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-blue-100">
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-gray-900">Search Instruments</h2>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, manufacturer, category, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-4 pl-12 bg-white border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-gray-900 placeholder-gray-400"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

           {/* Filter Section */}
          {categories.length > 0 && (
            <div className="flex-1 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-blue-100">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-900">Filter by Category</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg ${
                    selectedCategory === 'all'
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white scale-105'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  All Instruments
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600 text-lg">Loading instruments...</p>
          </div>
        ) : filteredInstruments.length > 0 ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-700 font-semibold text-lg">
                Showing {filteredInstruments.length} instrument{filteredInstruments.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInstruments.map((instrument) => (
                <InstrumentCard
                  key={instrument.id}
                  instrument={instrument}
                  onViewDetails={setSelectedInstrument}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-16 text-center border border-blue-100">
            <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
              <Search className="w-12 h-12 text-blue-600" />
            </div>
            <p className="text-gray-700 text-xl font-semibold mb-2">No instruments found</p>
            <p className="text-gray-500">
              {searchQuery
                ? 'Try adjusting your search query or filters'
                : selectedCategory === 'all'
                ? 'No instruments available at the moment.'
                : `No instruments found in the ${selectedCategory} category.`}
            </p>
          </div>
        )}
      </main>

      {selectedInstrument && (
        <InstrumentModal
          instrument={selectedInstrument}
          onClose={() => setSelectedInstrument(null)}
        />
      )}
    </div>
  );
}

export default Instruments;
