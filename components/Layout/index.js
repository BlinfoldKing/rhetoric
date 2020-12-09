import { useState } from 'react';
import Link from 'next/link';
import { FaHamburger, FaSun } from "react-icons/fa";
import styles from './Layout.module.scss'

const Layout = ({ children, metadata, posts, prev, next, curr }) => {
    const [sidebar, setSidebar] = useState(false)
    return <div className={styles.layout}>
        <div className={styles.side_nav}>
            {
                posts.map((post, i) =>
                    <Link href={'/' + post}>
                        <a>
                            <div className={`${styles.nav_item} ${i === curr ? styles.active : ''}`}>
                                {post
                                    .split('_')
                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(' ')}
                            </div>
                        </a>
                    </Link>
                )
            }
        </div>
        <div className={`${styles.main} ${sidebar ? styles.show_sidebar : styles.hide_sidebar}`}>
            <div className={styles.header_image}>
                <img src="/test_header.jpg" alt="" />
            </div>
            <div className={styles.header}>
                <div className={styles.icons}>
                    <FaHamburger
                        color="black"
                        size="30px"
                        onClick={() => setSidebar(!sidebar)}
                    />
                    <FaSun
                        color="black"
                        size="30px" />
                </div>
                <div className={styles.post_metadata}>
                    <div>
                        <h1>{metadata.title}</h1>
                    </div>
                    <p><strong>{metadata.excerpt}</strong></p>
                    {/* <p>{metadata.excerpt}</p> */}
                </div>
                <div className={styles.prev_next}>
                    {
                        prev >= 0
                            ? <Link href={'/' + posts[prev]}>
                                <a>
                                    <div>
                                        <div className={styles.prev}>Prev</div>
                                        <div>
                                            <strong>
                                                {posts[prev].split('_')
                                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                    .join(' ')}
                                            </strong>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                            : <div></div>
                    }
                    {
                        next >= 0
                            ? <Link href={'/' + posts[next]}>
                                <a>
                                    <div>
                                        <div className={styles.next}>Next</div>
                                        <div>
                                            <strong>
                                                {posts[next].split('_')
                                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                    .join(' ')}
                                            </strong>
                                        </div>
                                    </div>
                                </a>
                            </Link>
                            : <div></div>
                    }
                </div>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    </div>
}

export default Layout