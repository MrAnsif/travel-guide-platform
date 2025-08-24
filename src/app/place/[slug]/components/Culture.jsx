import React from 'react'
import { Check, X } from 'lucide-react';

const Culture = ({ data }) => {
  return (
    <div className="px-4 md:px-20 space-y-8">
      {/* Do's and Don'ts Section */}
      {(data?.dos || data?.donts) && (
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Do's */}
          {data?.dos && (
            <div className="space-y-4">
              <h2 className="text-foreground text-xl sm:text-2xl font-bold leading-tight tracking-tight flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                Cultural Do's
              </h2>
              <ul className="space-y-3">
                {data.dos.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground text-base leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Don'ts */}
          {data?.donts && (
            <div className="space-y-4">
              <h2 className="text-foreground text-xl sm:text-2xl font-bold leading-tight tracking-tight flex items-center gap-2">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                Cultural Don'ts
              </h2>
              <ul className="space-y-3">
                {data.donts.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <p className="text-muted-foreground text-base leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Customs Section */}
      {data?.customs && (
        <div className="space-y-4">
          <h2 className="text-foreground text-xl sm:text-2xl font-bold leading-tight tracking-tight">
            Local Customs
          </h2>
          <div className="grid gap-4">
            {data.customs.map((custom, index) => (
              <div key={index} className="p-4 bg-accent/50 rounded-lg border border-border">
                <p className="text-foreground text-base leading-relaxed">{custom}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Etiquette Guidelines */}
      {data?.etiquette && (
        <div className="space-y-4">
          <h2 className="text-foreground text-xl sm:text-2xl font-bold leading-tight tracking-tight">
            Etiquette Guidelines
          </h2>
          <div className="grid gap-6 sm:gap-8">
            {Object.entries(data.etiquette).map(([category, guideline]) => (
              <div key={category} className="space-y-2">
                <h3 className="text-foreground text-lg font-semibold capitalize tracking-tight">
                  {category} Etiquette
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed pl-4 border-l-4 border-primary/30">
                  {guideline}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Culture