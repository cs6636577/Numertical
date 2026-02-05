import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

const navbar = () => {
  const pathname = usePathname();

  const rootPages = ["/", "/bisection", "/false_position", "/onepoint", "/newton_rap", "/secant"];
  const regressPages = ["/composite_trap"];

  const isRootPage = rootPages.includes(pathname);
  const isRegressPages = regressPages.includes(pathname);
  return (
    <>
    <div className="shadow-md p-4 text-2xl font-semibold text-gray-600 sticky top-0 z-10bg-gray-500 bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-30 backdrop-saturate-100 backdrop-contrast-100 z-10 shadow-neutral-500">
        <ul className="flex justify-between mt-4 ml-10 mr-10">
            <li>NUMERICAL</li>
            <li>
                  <div className="dropdown dropdown-hover">
                  <div tabIndex={0} role="button" className="btn m-1">Change Method</div>
              {isRootPage &&
              (
                  <ul tabIndex={0} className="dropdown-content menu bg-gray-100 rounded-box z-1 w-52 p-2 shadow-sm">
                    <li><Link href='../'>Graphical</Link></li>
                    <li><Link href='../bisection'>Bisection</Link></li>
                    <li><Link href='../false_position'>False-Position</Link></li>
                    <li><Link href='../onepoint'>One-point</Link></li>
                    <li><Link href='../newton_rap'>Newton-Rapson</Link></li>
                    <li><Link href='../secant'>Secant</Link></li>
                  </ul>
              )}
              </div>
            </li>
        </ul>
    </div>

    <div className="flex space-x-8 justify-center mb-4 mt-10">
        {/* <ul className="flex space-x-8 justify-center mb-4 mt-15">
            <li>Root</li>
            <li>Metrix</li>
            <li>Interpolation</li>
            <li>Regression</li>
        </ul> */}
        <Link href='../'>
          <button className={isRootPage ? 'btn btn-soft' : 'btn btn-dash'}>Root</button>
        </Link>
        <button className="btn btn-dash">Metrix</button>
        <button className="btn btn-dash">Interpolation</button>
        <Link href='../composite_trap'>
          <button className={isRegressPages ? "btn btn-soft" : "btn btn-dash"}>Regression</button>
        </Link>
        <Link href='../problem'>
          <button className={pathname === '/problem' ? 'btn btn-soft' : 'btn btn-dash'}>Problem</button>
        </Link>
    </div>
    </>
  )
}

export default navbar
