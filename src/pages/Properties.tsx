import React, { useState } from 'react';
import { Plus, MapPin, Bed, Bath, Square, Edit, Trash2, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PropertyForm from '../components/Properties/PropertyForm';
import PropertyDetails from '../components/Properties/PropertyDetails';

const Properties: React.FC = () => {
  const { properties, deleteProperty } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [viewingProperty, setViewingProperty] = useState<any>(null);

  const handleDelete = (propertyId: string, propertyTitle: string) => {
    if (window.confirm(`Are you sure you want to delete property "${propertyTitle}"?`)) {
      deleteProperty(propertyId);
    }
  };

  const togglePropertyStatus = (propertyId: string, currentStatus: boolean) => {
    // This would typically call updateProperty
    console.log('Toggle property status:', propertyId, !currentStatus);
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-600 mt-2 text-sm lg:text-base">Manage your property listings and inventory</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center space-x-2 bg-midnight-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Property</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                <button
                  onClick={() => setViewingProperty(property)}
                  className="p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  title="View Details"
                >
                  <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                </button>
                <button
                  onClick={() => setEditingProperty(property)}
                  className="p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  title="Edit Property"
                >
                  <Edit className="h-3 w-3 sm:h-4 sm:w-4 text-midnight-blue" />
                </button>
                <button
                  onClick={() => handleDelete(property.id, property.title)}
                  className="p-1.5 sm:p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  title="Delete Property"
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                </button>
              </div>
            </div>
            
            <div className="p-4 lg:p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 truncate">{property.title}</h3>
                <span className="text-base lg:text-lg font-bold text-midnight-blue">
                  ₹{property.price.toLocaleString('en-IN')}
                </span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="text-xs sm:text-sm truncate">{property.location}</span>
              </div>

              <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-600 mb-3 lg:mb-4">
                <div className="flex items-center">
                  <Square className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span>{property.area} sq ft</span>
                </div>
                {property.bedrooms && (
                  <div className="flex items-center">
                    <Bed className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span>{property.bedrooms} bed</span>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="flex items-center">
                    <Bath className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span>{property.bathrooms} bath</span>
                  </div>
                )}
              </div>

              <p className="text-gray-600 text-xs sm:text-sm mb-3 lg:mb-4 line-clamp-2">{property.description}</p>

              <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 lg:mb-4">
                {property.features.slice(0, 3).map((feature) => (
                  <span key={feature} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {feature}
                  </span>
                ))}
                {property.features.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    +{property.features.length - 3} more
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => togglePropertyStatus(property.id, property.isActive)}
                  className={`px-2 sm:px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                    property.isActive 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                >
                  {property.isActive ? 'Active' : 'Inactive'}
                </button>
                <span className="text-xs text-gray-500 capitalize">{property.type}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Add Property Card */}
        <div 
          onClick={() => setShowAddForm(true)}
          className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 lg:p-6 hover:border-midnight-blue hover:bg-blue-50 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px]"
        >
          <Plus className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-medium text-gray-600 mb-2 text-center">Add New Property</h3>
          <p className="text-xs sm:text-sm text-gray-500 text-center">Click here to add a new property to your listings</p>
        </div>
      </div>

      {(showAddForm || editingProperty) && (
        <PropertyForm
          property={editingProperty}
          onClose={() => {
            setShowAddForm(false);
            setEditingProperty(null);
          }}
        />
      )}

      {viewingProperty && (
        <PropertyDetails
          property={viewingProperty}
          onClose={() => setViewingProperty(null)}
          onEdit={() => {
            setEditingProperty(viewingProperty);
            setViewingProperty(null);
          }}
        />
      )}
    </div>
  );
};

export default Properties;