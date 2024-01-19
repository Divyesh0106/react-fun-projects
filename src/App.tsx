import React, { lazy, Suspense } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function delay(Component:any):any{
  return new Promise( resolve =>{
    setTimeout(()=>{
      resolve(Component);
    },5000);
  })
}

const Loader = lazy(()=> import('./Layout/loader'));
const Layout  = lazy(() => import('./Layout/layout'));
const MainPage = lazy(() =>import('./Layout/mainPage'));
const TicTacToe = lazy(() => import('./TicTacToe/Tictactoe'));
const Clock25 = lazy(() => delay(import('./Clock25/Clock25')));
const Calculator = lazy(() => import('./Calculator/Calculator'));
const DrumMachine = lazy(() => import('./Drummachine/Drummachine'));
const MarkdownPreviwer = lazy(() => import('./MarkdownPreviwer/MarkdownPreviwer'));

const router = createBrowserRouter([
  {
    id: "root",
    path: '/',
    Component: Layout,
    children: [
      {
        index: true,
        Component: MainPage
      },
      {
        path: 'tic-tac-toe',
        Component: TicTacToe
      },
      {
        path: 'clock-25',
        Component: Clock25
      },
      {
        path: 'calculator',
        Component: Calculator
      },
      {
        path: 'drum-machine',
        Component: DrumMachine
      },
      {
        path: 'markdown-previewer',
        Component: MarkdownPreviwer
      }
    ]
  },
]);

function App() {
  return (
    <Suspense fallback={<Loader/>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
