import React from 'react';
import { templates } from '@/lib/templates';
import { sampleData } from '@/lib/sample-data';
import { TemplateCard } from './TemplateCard';

export const TemplateGallery = () => {
    // Group templates by category
    const categories = Array.from(new Set(templates.map(t => t.category)));

    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-16">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                    Choose Your Template
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Select from our professionally designed templates. Each one is crafted to help you stand out.
                </p>
            </div>

            <div className="space-y-16">
                {/* Recommended Section */}
                <div>
                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <span className="w-2 h-8 bg-yellow-500 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]"></span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-500">
                            Recommended for You
                        </span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {templates.filter(t => t.recommended).map((template) => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                data={sampleData}
                            />
                        ))}
                    </div>
                </div>

                {categories.map((category) => (
                    <div key={category}>
                        <h3 className="text-2xl font-bold text-white mb-8 capitalize flex items-center gap-3">
                            <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
                            {category} Templates
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {templates.filter(t => t.category === category).map((template) => (
                                <TemplateCard
                                    key={template.id}
                                    template={template}
                                    data={sampleData}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
