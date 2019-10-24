
module.exports = {
	sections: [
		{
			id: 0,
			name: 'section0',
			description: 'section-descriprion0',
			subSections: [
				{
					id: 0,
					name: 'sub-section00',
					description: 'subsection-descriprion0',
					channels: [
						{
	
							id: 0,
							name: 'subSection00 - channel0',
							description: 'subSection00 - channel0 - descriprion',
							messages: [
								{
									id: 0,
									senderId: '0',
									date: new Date(),
									text: '1111111111 11111 111111',
								}
							]
						}
					]
				}
			]
		},
		{
			id: 1,
			name: 'section1',
			description: 'section-descriprion1',
			subSections: [
				{
					id: 0,
					name: 'sub-section10',
					description: 'subsection-descriprion10',
					channels: []
				}
			]
		}
	],

	currentSection: {
        id: 0,
		name: 'section0',
		description: 'section-descriprion0',
        subSections: [
            {
                id: 0,
                name: 'sub-section00',
                description: 'subsection-descriprion0',
                channels: [
                    {

                        id: 0,
                        name: 'subSection00 - channel0',
                        description: 'subSection00 - channel0 - descriprion',
                        messages: [
                            {
                                id: 0,
                                senderId: '0',
                                date: new Date(),
                                text: '1111111111 11111 111111',
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
