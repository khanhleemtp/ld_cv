import HomeSection from '../../components/HomePage/HomeSection';
import HomeToTop from '../../components/HomePage/HomeToTop';
import HomeSeachJob from '../../components/HomePage/HomeSeachJob';
import HomeCompanyList from '../../components/HomePage/HomeCompanyList';
import HomePartner from '../../components/HomePage/HomePartner';

const HomePage = () => {
  return (
    <>
      <HomeSeachJob />
      <HomeCompanyList />
      <HomeSection
        id={1}
        title="Tạo CV một cách nhanh chóng"
        body="Hãy tạo CV của bạn ngay giúp bạn tiếp cận với doanh nghiệp hàng đầu"
        img="/r1.png"
        textBtn="Tạo CV ngay"
      />

      <HomeSection
        id={2}
        title="Thiết kế CV một cách dễ hàng"
        body="Chúng tôi có những công cụ tốt nhất để tạo CV nhanh chóng"
        img="/resume.png"
        textBtn="Tạo CV ngay"
      />
      <HomeToTop />
      <HomePartner />
    </>
  );
};

export default HomePage;
