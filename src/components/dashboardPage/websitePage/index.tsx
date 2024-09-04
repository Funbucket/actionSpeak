import ImageManagementSection from './imageManagement';
import InstallationSection from './installation';
import PopupManagementSection from './popupManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const WebsiteMetrics = ({ params }: { params: { websiteId: string } }) => {
  return (
    <>
      <InstallationSection websiteId={params.websiteId} />
      <section className='mx-auto max-w-2xl px-6 py-8'>
        <Tabs defaultValue='popups' className='w-full'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='popups'>팝업 관리</TabsTrigger>
            <TabsTrigger value='images'>이미지 관리</TabsTrigger>
          </TabsList>
          <TabsContent value='popups'>
            <PopupManagementSection websiteId={params.websiteId} />
          </TabsContent>
          <TabsContent value='images'>
            <ImageManagementSection websiteId={params.websiteId} />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default WebsiteMetrics;
