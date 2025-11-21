export type ImageItem = {
  _id: string, //Object ID as string
  filename: string,
  url: string,
  description: string
}
export interface ImageCardProps {
  url: string,
  description: string,
  onEdit: () => void,
  onDelete: () => void,
}

export interface uploadCard {
  onPreview: string;
  onFile: (e: React.ChangeEvent<HTMLElement>) => void;
}