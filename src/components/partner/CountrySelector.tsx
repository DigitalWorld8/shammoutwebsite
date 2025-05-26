import { useState } from "react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { countries } from "@/lib/countries";

export default function CountrySelector({ formik }) {


    const [searchTerm, setSearchTerm] = useState("");

    const filteredCountries = countries.filter((country) =>
        `${country.name} ${country.code}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Select
            value={formik.values.country}
            onValueChange={(value) => {
                formik.setFieldValue("country", value);
                setSearchTerm(""); // clear search after selection
            }}
        >
            <SelectTrigger className="justify-center gap-3 border-0 text-lg h-full text-[#101828] py-4 pl-[22px] pr-4 max-md:pl-5 rounded-none focus:ring-0">
                <SelectValue placeholder="Select Country" />
            </SelectTrigger>

            <SelectContent
                className="p-0"
                sideOffset={4}
                avoidCollisions={false}
                onPointerDownOutside={(e) => {
                    // allow input interaction without closing
                    const target = e.target as HTMLElement;
                    if (target.closest("input")) e.preventDefault();
                }}
            >
                {/* Search bar, fixed at top */}
                <div className="sticky top-0 bg-white z-10 p-2 border-b">
                    <Input
                        placeholder="Search country"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onMouseDown={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                    />
                </div>

                {/* Country list */}
                <div className="max-h-64 overflow-y-auto">
                    {filteredCountries.length > 0 ? (
                        filteredCountries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                                {country.name} ({country.code.toLowerCase()})
                            </SelectItem>
                        ))
                    ) : (
                        <div className="p-2 text-sm text-gray-500">No countries found</div>
                    )}
                </div>
            </SelectContent>
        </Select>
    );
}
