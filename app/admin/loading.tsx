import { GlobalLoading } from '@/components/ui/global-loading';

export default function AdminLoading() {
  return (
    <GlobalLoading 
      isLoading={true} 
      message="Loading admin panel..."
      variant="fullscreen"
    />
  );
}
