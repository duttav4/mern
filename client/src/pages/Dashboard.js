import React from 'react';
import Layout from '../component/layout/Layout';
import { useAuth } from '../component/context/AuthContext';
import AdminMenu from './admin/AdminMenu';

export default function Dashboard()
{
  const [ auth ] = useAuth();
  return (
    <>
      <Layout>
        <div className='container-fluid m-3 p-3'>
          <div className='row'>
            <div className='col-md-3'>
              <AdminMenu />
            </div>
            <div className='col-md-9'>
              <div className='card w-75 p-3 text-center'>
                <h1 className='text-transform-uppercase'>{auth?.user?.name}</h1>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
