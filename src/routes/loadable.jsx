import React, { Component, 
  // useState, useEffect, useCallback
 } from 'react';
// import { Spin } from 'antd';
import { Toast } from 'antd-mobile';

function Loadable() {
  return <div>this is Loadable 。。。。。loading</div>;
}

const importView = (view) => import(`views/${view}`);
const importCom = (com) => import(`common/${com}`);

// export const AsyncView = ({ view }) => {
//   const [load, setLoad] = useState(true);
//   const [Com, setCom] = useState(null);
//   const loadView = useCallback(async () => {
//     const { default: component } = await importView(view);
//     setCom(component);
//     setLoad(false);
//   }, [view]);
//   useEffect(() => {
//     loadView();
//   }, [loadView]);
//   return <>{load ? <Loadable /> : <Com data={Com} />}</>;
// };

// 有问题的
// export const aysncView = (view) => {
//   return () => {
//     const [load, setload] = useState(true);
//     const [Com, setcom] = useState(null);
//     async function LoadView() {
//       const { default: component } = await importView(view);
//       setcom(component);
//       setload(false);
//     }
//     useEffect(() => {
//       // async function LoadView() {
//       //   const { default: component } = await importView(view);
//       //   setcom(component);
//       //   setload(false);
//       // }
//       LoadView();

//       // const { default: component } = await importView(view);
//       // setcom(component);
//       // setload(false)
//       // return <div className="center fz20 h100">loading ....</div>;
//     }, [load]);

//     return (
//       <>
//         {load ? (
//           <Spin tip="this is loading ..." />
//         ) : (
//           // <div className="center fz20 h100">loading ....</div>
//           <Com data={Com} />
//         )}
//       </>
//     );
//   };
// };

// ok
export const asyncComponent = (view, isView = true, delay = 1000) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        state: false,
        Com: null,
      };
      Toast.loading('Loading...', 0);
      console.log(1)
    }

    async componentDidMount() {
      const getView = isView ? importView : importCom;
      // Toast.loading('Loading...', 0);
      const { default: component } = await getView(view);
      setTimeout(() => {
        Toast.hide();
        this.setState({
          Com: component,
        });
      }, delay);
    }
    render() {
      let { Com } = this.state;
      return <>{this.state.Com && <Com data={this.state.data} />}</>;
    }
  };
};

export default Loadable;
