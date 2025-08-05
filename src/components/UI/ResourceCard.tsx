import React, { useState } from "react";
import {
  Download,
  Star,
  MessageCircle,
  User,
  Eye,
  Calendar,
  Tag,
  Trash2,
} from "lucide-react";
import { Resource } from "../../types";
import { deleteResource, updateResourceDownloads } from "../../services/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface ResourceCardProps {
  resource: Resource;
  onViewDetails: (resource: Resource) => void;
  isUploadsTab?: boolean;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  isUploadsTab,
  onViewDetails,
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      // Update download count
      await updateResourceDownloads(resource.id);

      // Create download link
      const link = document.createElement("a");
      link.href = resource.fileURL;
      link.download = resource.fileName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setDownloading(false);
    }
  };

  const handleDelete = async () => {
    try {
      // Update download count
      await deleteResource(resource.id, resource.fileURL);
    } catch (error) {
      console.error("Error deleting file:", error);
    } 
    // finally {
    //   const redirectPath = resource.type === 'notes' ? '/notes' :
    //     resource.type === 'pyq' ? '/pyq' : '/syllabus';
    //   navigate(redirectPath);
    // }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "notes":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
      case "pyq":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "syllabus":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center justify-between space-x-2 mb-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium gap-1 ${getTypeColor(
                resource.type
              )}`}
            >
              {resource.type.toUpperCase()}

            </span>
            {resource.type === 'pyq' && (
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                {resource.year}
              </span>
            )}
            {user.role == 'contributor' && isUploadsTab && (
              <button
                onClick={handleDelete}
                className="text-red-400 hover:text-red-600 cursor-pointer"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {resource.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {resource.subject} • {resource.semester}
          </p>
        </div>
      </div>

      {/* Description */}
      {resource.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
          {resource.description}
        </p>
      )}

      {/* Tags */}
      {resource.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {resource.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
          {resource.tags.length > 3 && (
            <span className="text-xs text-gray-500 dark:text-gray-400">
              +{resource.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Download className="h-4 w-4" />
            <span>{resource.downloads}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4" />
            <span>
              {resource.averageRating.toFixed(1)} ({resource.totalRatings})
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{resource.createdAt.toLocaleDateString()}</span>
          </div>
        </div>
        <span className="text-xs">{formatFileSize(resource.fileSize)}</span>
      </div>

      {/* Uploader Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {resource.uploaderName}
            </p>
            {resource.showUploaderContact &&
              (resource.uploaderEmail || resource.uploaderPhone) && (
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {resource.uploaderEmail && (
                    <a
                      href={`mailto:${resource.uploaderEmail}`}
                      className="hover:underline"
                       title="Click to send an email"
                    >
                      <span>{resource.uploaderEmail}</span>
                    </a>
                  )}
                  {resource.uploaderPhone && resource.uploaderEmail && (
                    <span> • </span>
                  )}
                  {resource.uploaderPhone && (
                    <span>{resource.uploaderPhone}</span>
                  )}
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="h-4 w-4" />
          <span>{downloading ? "Downloading..." : "Download"}</span>
        </button>
        <button
          onClick={() => onViewDetails(resource)}
          className="flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Eye className="h-4 w-4" />
          <span>View</span>
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;
