import React from 'react';
import ContactItem from './ContactItem';
import { Mail, Facebook, Instagram, Phone } from 'lucide-react';

export interface ContactDetail {
  type: string;
  label: string;
  value: string;
  url: string;
}

interface ContactsProps {
  contacts: ContactDetail[];
}

const iconMap: Record<string, React.ElementType> = {
  email: Mail,
  facebook: Facebook,
  instagram: Instagram,
  phone: Phone
};

const Contacts: React.FC<ContactsProps> = ({ contacts }) => {
  return (
    <div className="w-full py-2 md:py-3 h-full flex flex-col">
      <h2 className="text-lg md:text-xl font-semibold mb-3 text-custom-text-primary">
        Contacts
      </h2>
      <div className="bg-gradient-card rounded-lg h-full flex-grow overflow-hidden">
        <div className="h-full overflow-y-auto">
          {contacts.map((contact, index) => (
            <ContactItem
              key={index}
              icon={iconMap[contact.type]}
              label={contact.label}
              value={contact.value}
              url={contact.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;