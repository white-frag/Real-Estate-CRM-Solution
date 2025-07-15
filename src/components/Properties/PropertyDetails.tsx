import React from 'react';
import { X, Edit, MapPin, Bed, Bath, Square, Calendar } from 'lucide-react';
import { Property } from '../../types';
import { format } from 'date-fns';

interface PropertyDetailsProps {
  property: Property;
  onClose: () => void;
  onEdit: () => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property, onClose, onEdit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Property Details</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-midnight-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="h-3 w-3" />
              <span>Edit</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{property.title}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-2xl font-bold text-midnight-blue">
                    ₹{property.price.toLocaleString('en-IN')}
                  </span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                    property.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {property.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{property.location}</span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Square className="h-6 w-6 mx-auto mb-1 text-gray-600" />
                  <div className="text-lg font-semibold">{property.area}</div>
                  <div className="text-sm text-gray-600">sq ft</div>
                </div>
                {property.bedrooms && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Bed className="h-6 w-6 mx-auto mb-1 text-gray-600" />
                    <div className="text-lg font-semibold">{property.bedrooms}</div>
                    <div className="text-sm text-gray-600">bedrooms</div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Bath className="h-6 w-6 mx-auto mb-1 text-gray-600" />
                    <div className="text-lg font-semibold">{property.bathrooms}</div>
                    <div className="text-sm text-gray-600">bathrooms</div>
                  </div>
                )}
              </div>

              <div>
                <span className="inline-block px-3 py-1 bg-midnight-blue text-white text-sm rounded-full capitalize">
                  {property.type}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Description</h4>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Features & Amenities</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {property.features.map((feature, index) => (
                  <div key={index} className="flex items-center p-2 bg-gray-50 rounded">
                    <div className="w-2 h-2 bg-midnight-blue rounded-full mr-2"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2" />
              <span>Listed on {format(property.createdAt, 'MMMM dd, yyyy')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;