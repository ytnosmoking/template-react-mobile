import { useState, useCallback, memo } from 'react';
import { TabBar, Button, WhiteSpace, Icon } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import SvgIcon from 'common/SvgIcon';
const BtnCom = memo(({ to, type = 'primary' }) => {
  console.log(1);

  const history = useHistory();
  console.log(history);
  const goTo = useCallback(
    (value) => {
      history.push(value);
    },
    [history]
  );
  return (
    <>
      <WhiteSpace />
      <Button type={type} onClick={() => goTo(to)}>
        /{to}
      </Button>
    </>
  );
});

const HomeIndex = () => {
  const [tab, setTab] = useState(1);
  // const history = useHistory();

  const arr = Array.from({ length: 100 }).map((index, k) => k);

  return (
    <div className="h100">
      <TabBar
        unselectedTintColor="#949494"
        // tintColor="#33A3F4"
        tintColor="red"
        barTintColor="white"
      >
        <TabBar.Item
          title="Life"
          key="Life"
          icon={
            <SvgIcon iconClass="dean" />
            // <Icon type="loading" />
          }
          selectedIcon={<SvgIcon iconClass="dean" />}
          selected={tab === 1}
          badge={1}
          onPress={() => {
            setTab(1);
          }}
          data-seed="logId"
        >
          <BtnCom to="/base" />
          <BtnCom to="/login" />
          <BtnCom to="/hooks" />
          <BtnCom to="/404" />

          {arr.map((item) => {
            return <div key={item}>tab ----{item}</div>;
          })}
        </TabBar.Item>
        <TabBar.Item
          icon={
            <SvgIcon iconClass="teacher" />
            // <div
            //   style={{
            //     width: '22px',
            //     height: '22px',
            //     background:
            //       'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat',
            //   }}
            // />
          }
          selectedIcon={
            <SvgIcon iconClass="director" />

            // <div
            //   style={{
            //     width: '22px',
            //     height: '22px',
            //     background:
            //       'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat',
            //   }}
            // />
          }
          title="Koubei"
          key="Koubei"
          badge={'new'}
          selected={tab === 2}
          onPress={() => {
            setTab(2);
          }}
          data-seed="logId1"
        >
          tab 2222
        </TabBar.Item>
      </TabBar>
    </div>
  );
};

export default HomeIndex;
