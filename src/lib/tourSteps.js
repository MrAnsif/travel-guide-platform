export const tourSteps = [
  {
    element: '.theme-toggle-tour',
    popover: {
      title: 'FadeShift Theme Toggle',
      description: 'Not the usual light-dark switch. Give it a tap and watch it glide.',
      side: 'bottom',
      align: 'end'
    }
  },
  {
    element: '.search-tour',
    popover: {
      title: 'Explore Smarter',
      description: 'Type a location and let AI give you everything that actually matters, from crime rate to culture tips and hidden gems.',
      side: 'bottom',
      align: 'start'
    }
  }
]

export const tourConfig = {
  showProgress: true,
  showButtons: ['next', 'previous', 'close'],
  popoverClass: 'custom-driver-popover',
}