import PropTypes from 'prop-types'
import React, { useEffect, useRef } from 'react'

// //Import Scrollbar
import SimpleBar from 'simplebar-react'

// MetisMenu
import MetisMenu from 'metismenujs'
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'

//i18n
import { withTranslation } from 'react-i18next'

const SidebarContent = props => {
  const ref = useRef()
  
  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname

    const initMenu = () => {
      new MetisMenu('#side-menu')
      let matchingMenuItem = null
      const ul = document.getElementById('side-menu')
      const items = ul.getElementsByTagName('a')
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, [props.location.pathname])

  useEffect(() => {
    ref.current.recalculate()
  })

  const scrollElement = item => {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  const activateParentDropdown = item => {
    item.classList.add('active')
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== 'side-menu') {
      parent2El.classList.add('mm-show')
    }

    if (parent) {
      parent.classList.add('mm-active')
      const parent2 = parent.parentElement

      if (parent2) {
        parent2.classList.add('mm-show') // ul tag

        const parent3 = parent2.parentElement // li tag

        if (parent3) {
          parent3.classList.add('mm-active') // li
          parent3.childNodes[0].classList.add('mm-active') //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add('mm-show') // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add('mm-show') // li
              parent5.childNodes[0].classList.add('mm-active') // a tag
            }
          }
        }
      }
      scrollElement(item)
      return false
    }
    scrollElement(item)
    return false
  }

  return (
    <>
      <SimpleBar style={{ maxHeight: '100%' }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">{props.t('Main Menu')} </li>

            {/* <li>
              <Link to="/dashboard" className="waves-effect">
                <i className="ti-home"></i>
                <span>{props.t("Dashboard")}</span>
              </Link>
            </li> */}

            <li>
              <Link to="/users/list" className="waves-effect">
                <i className="ti-user"></i>
                <span>{props.t('Users')}</span>
              </Link>
            </li>

            <li>
              <Link to="/leaderboard/list" className="waves-effect">
                <i className="ti-medall"></i>
                <span>{props.t('Leaderboard')}</span>
              </Link>
            </li>

            <li>
              <Link to="/companies/list" className="waves-effect">
                <i className="ti-briefcase"></i>
                <span>{props.t('Companies')}</span>
              </Link>
            </li>

            {/* <li>
              <Link to="/media/list" className="waves-effect">
                <i className="ti-gallery"></i>
                <span>{props.t('Media')}</span>
              </Link>
            </li> */}
            <li>
              <Link to="/video/list" className="waves-effect">
                <i className="ti-camera"></i>
                <span>{props.t('Video Asset')}</span>
              </Link>
            </li>
            <li>
              <Link to="/book/list" className="waves-effect">
                <i className="ti-book"></i>
                <span>{props.t('Book Asset')}</span>
              </Link>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </>
  )
}

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
}

export default withRouter(withTranslation()(SidebarContent))
