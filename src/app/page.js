import React from 'react'

const page = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden" >
      <div className="layout-container flex h-full grow flex-col">
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f4f2f0] px-10 py-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4 text-[#181411]">
              <div className="size-4">
                
              </div>
              <h2 className="text-[#181411] text-lg font-bold leading-tight tracking-[-0.015em]">Local Insights</h2>
            </div>
            <div className="flex items-center gap-9">
              <a className="text-[#181411] text-sm font-medium leading-normal" href="#">Explore</a>
              <a className="text-[#181411] text-sm font-medium leading-normal" href="#">About</a>
              <a className="text-[#181411] text-sm font-medium leading-normal" href="#">Contact</a>
            </div>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <label className="flex flex-col min-w-40 !h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                <div
                  className="text-[#887263] flex border-none bg-[#f4f2f0] items-center justify-center pl-4 rounded-l-xl border-r-0"
                  data-icon="MagnifyingGlass"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                    <path
                      d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                    ></path>
                  </svg>
                </div>
                <input
                  placeholder="Search"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181411] focus:outline-0 focus:ring-0 border-none bg-[#f4f2f0] focus:border-none h-full placeholder:text-[#887263] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                  value=""
                />
              </div>
            </label>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e77223] text-white text-sm font-bold leading-normal tracking-[0.015em]"
            >
              <span className="truncate">Sign up</span>
            </button>
          </div>
        </header>
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:p-4">
                <div
                  className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4"
                  style={{backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAK_C24DEUqRfSWqccGRCT4i4JINs2tMJ3MN7Di8Ea4IBn3KfL-rGT-8uEQnZJ8byxJ8DvkjzUchaq6V2OrLEeI5zkOsoJZ-E4uDgrTfRMwTOS3YYfTPSjqCAQjkMXhJRwgQLhpjOhCMVOpXCaV-CIuqihmdB3d2kRKiOlG7qd2CmKXIKg51j1_crp4V_iODF-Hwk2Dgzw7N4VOvjDqAQvppZyAt6ytAneCIANvsj9f-Fp4tk1ZV11aY5y-85j6bfb8ww3hggyiUqF-")'}}
                >
                  <div className="flex flex-col gap-2 text-center">
                    <h1
                      className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]"
                    >
                      Discover the Heart of Every Neighborhood
                    </h1>
                    <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                      Uncover the unique stories, hidden gems, and essential insights that define each community. From local culture to safety tips, we provide the knowledge you
                      need to feel at home, wherever you go.
                    </h2>
                  </div>
                  <label className="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">
                    <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                      <div
                        className="text-[#887263] flex border border-[#e5dfdc] bg-white items-center justify-center pl-[15px] rounded-l-xl border-r-0"
                        data-icon="MagnifyingGlass"
                        data-size="20px"
                        data-weight="regular"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                          <path
                            d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"
                          ></path>
                        </svg>
                      </div>
                      <input
                        placeholder="Search for a neighborhood"
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#181411] focus:outline-0 focus:ring-0 border border-[#e5dfdc] bg-white focus:border-[#e5dfdc] h-full placeholder:text-[#887263] px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                        value=""
                      />
                      <div className="flex items-center justify-center rounded-r-xl border-l-0 border border-[#e5dfdc] bg-white pr-[7px]">
                        <button
                          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#e77223] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]"
                        >
                          <span className="truncate">Search</span>
                        </button>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            <h2 className="text-[#181411] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Featured Destinations</h2>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBOzyHYfKYcZkjaV1cAX_htcjD1d72L4TWMuS3ZpH8daBhW52bJh6EQHn0WWVzH74yS0Mv-w3SCwV9uyrxK_xWJF1hdbWLXp6a2Vv3Hp_dcOUs7wXr9ggAXmK50-R7mh6_MoT9USJwaDFR5Q7BmS2UZvUt3-jJJSN1nOm710aLjlDbT8IKHGawHInspYIV5Q98O-GuUFG4eDaQt9mzQeQz6WxHx_vr2beKOY5BW1a9oOiohOvljBqBfBj77h5IjsKNWGm0_p1h7gaDp")'}}
                ></div>
                <div>
                  <p className="text-[#181411] text-base font-medium leading-normal">San Francisco, CA</p>
                  <p className="text-[#887263] text-sm font-normal leading-normal">Explore the vibrant culture and iconic landmarks of San Francisco.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCY96mHFpZSmOLU1x-hm-JWiVz2moKDbAiBcOkSvF-RD8yhA6Gn98x_vzl9iDOOJErCOR6a8f7y6QCCJb5s1aMZsPGj9DF-D5qMuAXoHF5GR6k5s823pfZkiTReB5OOL8Hhn5y5T3dN8VXKBJlW9DDWri0sDjikNdQFguReS-_R4ieCfG7zTWCCgIirNTmFczbEQ3Dy6ktbm8UVbt9mo55uM3hk4Yz9IDkviPcv2HQKZ8qtYJW_l25ivXnn1mof8H4Pd55jF9fjS960")'}}
                ></div>
                <div>
                  <p className="text-[#181411] text-base font-medium leading-normal">New York, NY</p>
                  <p className="text-[#887263] text-sm font-normal leading-normal">Experience the energy and diversity of New York City.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAxlK9Uy8k-uUcLzm5Ph_VgJ0VnR5yn4tkWeC88dSpkd5fxbo5By4mtwt1LHeI8a4g9RYfUZ1_LNacqzKmVyCal3ZU-TSVfJb9l-uVMnksyQXThuI54hPFskHZyUoxB0LhxUhRdQits__zNXFy-Ptyb4GwzSEdq_62YxIv1dtF7sbWLvfWHH2KMAvfk_r2qkwFKx0U4vCcrrI8KmBX7dG48UJ5BXa3zndo_fBQOXlJR3nAzkyrCTBgqn3yeBoAgu9yV9ai7M6FP9-Vh")'}}
                ></div>
                <div>
                  <p className="text-[#181411] text-base font-medium leading-normal">Los Angeles, CA</p>
                  <p className="text-[#887263] text-sm font-normal leading-normal">Discover the entertainment capital of the world, Los Angeles.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC5mxs0b9i6D6JBp3DgLRXEwZQlktgfJvS6-FcmCDAxdXZtt-9kEff3mS_OeM6jikrY_OiB9dCHOWW4tp0rTHVj24zf7rekhRfsa6B9WY8doY0EzOX6BhDW2Ds7WUjUyBoYUOTfJh4wAF-0XxuS7qZM6qmhRxpWDhrZbkCaZrfdPRULTu-Brq_oCxdlp9h1idwIT8zG0-TF3DaW0vq8v-f3kwV70v0LmO0alZz9WB9VwBxzjJS0vt9uw86nQLqOSOpDPF68xNSmw50z")'}}
                ></div>
                <div>
                  <p className="text-[#181411] text-base font-medium leading-normal">Chicago, IL</p>
                  <p className="text-[#887263] text-sm font-normal leading-normal">Immerse yourself in the rich history and architecture of Chicago.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXwCBTDJlpcxIxyd3alGcW__Zg-JXWJv42Fhpt4LyZrf7QrBZJlmKyzj8IDbZr1v6gWCIqoqcpujDlEmsp2aAbP4Sz42MMoxHlH7h3ZZeLSYXZnJKh_suJyzqzm2FC5AN42M7Vav8TyrSs60poc9xLcZHn8bww1vaXe78YyQGlIz5hxdK1SN1mozAlkrRzsYm8fMenIXG2hp9y1Zqt35_QOF37VZdXvV6X_ipXTj8atY_zDD9JH_m891cc-uy0GjTQJqMyv5h1Mpbk")'}}
                ></div>
                <div>
                  <p className="text-[#181411] text-base font-medium leading-normal">Miami, FL</p>
                  <p className="text-[#887263] text-sm font-normal leading-normal">Enjoy the sun, beaches, and nightlife of Miami.</p>
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAakxb3A6UGrFhd_z9hJxd20DW3g5m9kqIcN39jtlsiED2oBxwM-M3ABHQpXYIAwxL4ZI5ZfT_6eRKTJcozRJQlbGfxf-WI13XiYFvHurSv9KCPOCwZfTJCYoynkyYpsT5vu8p1Bmqr9IY5cpyFEJezSbveaLkBqJl9l28WqFgDB9i41lTRlHBXuK6I7mqneFDAGCZmVMfnsLD4eGrMAEFnDoqCIq8TQIaLSFtqnoW6Fen3G_Ym9YyVuYjk5B_ykjnSfn_agQMV0V6u")'}}
                ></div>
                <div>
                  <p className="text-[#181411] text-base font-medium leading-normal">Seattle, WA</p>
                  <p className="text-[#887263] text-sm font-normal leading-normal">Uncover the tech hub and natural beauty of Seattle.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page