import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
    {
        name: "Sarah Mitchell",
        title: "Head of Marketing at TechFlow",
        image: "https://i.pravatar.cc/100?img=5",
        body: "Ukonnect automated our entire lead nurturing pipeline. We now generate 3x more qualified leads with half the manual work."
    },
    {
        name: "David Brown",
        title: "CEO at NextGen Solutions",
        image: "https://i.pravatar.cc/100?img=11",
        body: "Within two months our sales pipeline was fully automated. The AI follow-up system alone increased our close rate by 40%."
    },
    {
        name: "Emily Carter",
        title: "Growth Lead at DataSync",
        image: "https://i.pravatar.cc/100?img=9",
        body: "The AI integrations connected all our tools seamlessly. Our marketing team saves 20+ hours a week on repetitive tasks."
    },
    {
        name: "Michael Chang",
        title: "VP of Sales at RetailCorp",
        image: "https://i.pravatar.cc/100?img=12",
        body: "Our cost per lead dropped by 60% after implementing Ukonnect. The AI lead scoring is incredibly accurate."
    }
];

export const Testimonials = () => {
    return (
        <section className="py-[60px] md:py-[80px] lg:py-[120px] max-w-[1300px] mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
                <p className="text-primary font-semibold tracking-wide uppercase text-sm mb-3">Testimonials</p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Results From Real Teams</h2>
                <p className="text-slate-500 text-lg">
                    How companies use Ukonnect to automate growth and close more deals.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {testimonials.map((testimonial, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200 shadow-sm text-center flex flex-col items-center"
                    >
                        <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-slate-100 shadow-sm">
                            <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="text-lg font-bold text-slate-900">{testimonial.name}</h4>
                        <p className="text-slate-500 text-sm mb-3">{testimonial.title}</p>
                        <div className="flex items-center gap-1 mb-6 text-amber-400">
                            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                        </div>
                        <p className="text-slate-700 italic leading-relaxed text-sm">
                            "{testimonial.body}"
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
