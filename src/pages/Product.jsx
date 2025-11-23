import { useQuery } from '@tanstack/react-query';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  limit
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { useParams, Link } from 'react-router-dom';

// Fetch main product
async function fetchProduct(id) {
  const productRef = doc(db, 'Product', id);
  const docSnap = await getDoc(productRef);
  if (!docSnap.exists()) throw new Error('Product not found');
  return { id: docSnap.id, ...docSnap.data() };
}

// Fetch related products based on tags and same category
async function fetchRelatedProducts({ category, tags, excludeId }) {
  if (!tags?.length || !category) return [];

  const q = query(
    collection(db, 'Product'),
    where('category', '==', category),
    where('tags', 'array-contains-any', tags),
    limit(8) // get more than 4 to allow filtering
  );

  const snapshot = await getDocs(q);

  return snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(p => p.id !== excludeId) // exclude current product
    .slice(0, 4); // limit to 4 related
}

export default function Product() {
  const { id } = useParams();

  // Get the current product
  const {
  data: product,
  error,
  isLoading,
} = useQuery({
  queryKey: ['product', id],
  queryFn: () => fetchProduct(id),
});

// Get related products using category + tags
const { data: related = [] } = useQuery({
  queryKey: ['related', product?.category, product?.tags, id],
  queryFn: () =>
    fetchRelatedProducts({
      category: product?.category,
      tags: product?.tags,
      excludeId: id,
    }),
  enabled: !!product?.tags && !!product?.category,
});

  console.log(related)

  if (isLoading) return <p>Loading product...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Product Section */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* Product Image */}
        <div className="md:w-1/2">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-auto max-h-[600px] object-cover rounded-lg shadow-md"
          />
        </div>
        
        {/* Product Details */}
        <div className="md:w-1/2 font-serif">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">{product.name}</h1>
          <p className="text-teal-800 text-2xl font-light mb-6">${product.price}</p>
          
          <div className="prose max-w-none text-gray-700 mb-8">
            <p className="leading-relaxed">{product.description}</p>
          </div>
          
          {/* Size Selector (if applicable) */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
            <div className="flex gap-2">
              {['S', 'M', 'L'].map(size => (
                <button 
                  key={size}
                  className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-md hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Add to Cart */}
          <button className="w-full bg-teal-800 text-white py-3 px-6 rounded-md hover:bg-teal-700 transition duration-150 font-medium">
            Add to Cart
          </button>
          
          {/* Product Details Accordion */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <details className="group mb-4">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="text-sm font-medium text-gray-900">Materials & Care</span>
                <svg className="h-5 w-5 text-gray-500 group-open:rotate-180 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-2 text-sm text-gray-700">
                <p>Made with 18k gold plating and genuine pearls. Avoid contact with water and chemicals.</p>
              </div>
            </details>
            
            <details className="group">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="text-sm font-medium text-gray-900">Shipping & Returns</span>
                <svg className="h-5 w-5 text-gray-500 group-open:rotate-180 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-2 text-sm text-gray-700">
                <p>Free shipping on all orders. 30-day return policy. Items must be unused with original packaging.</p>
              </div>
            </details>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      <div className="mt-20">
        <h3 className="text-xl font-serif font-medium text-gray-900 mb-6 border-b border-gray-200 pb-2">You Might Also Like</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {related.map(item => (
            <Link 
              to={`/product/${item.id}`} 
              key={item.id}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm font-serif text-gray-900 truncate mb-1">{item.name}</p>
                  <p className="text-xs font-serif text-teal-800">${item.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
