import React from 'react';
import ContactItem from './ContactItem';
import { Mail, Facebook, Instagram, Phone } from 'lucide-react';


interface ContactDetail {
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
    <div className="w-full pb-6 py-3 h-full">
      <h2 className="text-xl font-semibold mb-4 text-custom-text-primary">Contacts</h2>
      <div className="bg-gradient-card rounded-lg">
        <div className="">
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