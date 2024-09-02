import ImageItem from './ImageItem';

interface ImageListProps {
  images: any[];
  onPreview: (imageName: string) => void;
  onDelete: (imageName: string) => void;
  previewType: 'toast' | 'basicPopup' | 'macWindowPopup';
  setPreviewType: (type: 'toast' | 'basicPopup' | 'macWindowPopup') => void;
}

const ImageList: React.FC<ImageListProps> = ({
  images,
  onPreview,
  onDelete,
  previewType,
  setPreviewType,
}) => (
  <div className='grid grid-cols-1 gap-4'>
    {images.map((image) => (
      <ImageItem
        key={image.id}
        image={image}
        onPreview={onPreview}
        onDelete={onDelete}
        previewType={previewType}
        setPreviewType={setPreviewType}
      />
    ))}
  </div>
);

export default ImageList;
