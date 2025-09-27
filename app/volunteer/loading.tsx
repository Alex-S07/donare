import { GlobalLoading } from '@/components/ui/global-loading';

export default function VolunteerLoading() {
  return (
    <GlobalLoading 
      isLoading={true} 
      message="Loading volunteer portal..."
      variant="default"
    />
  );
}
