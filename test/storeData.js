
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
	},
	
	currentSubSection: {
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
	},

	currentChannel:{

		id: 0,
		senderId: '0',
		name: 'subSection00 - channel0',
		info: '',
		descriptionMessage: 'Hello World - 0!',
		messages: [
			{
				id: 0,
				senderId: '0',
				date: new Date(),
				text: '0000000000000000000000000',
			},
			{
				id: 1,
				senderId: '1',
				date: new Date(),
				text: '1111111111 11111 111111',
			}
		]
	},

	userInfo: {
		id: 0,
		nickName: 'First_User',
		name: 'Qwerty Asdf',
		birthDate: new Date(),
		city: 'Moscow',
		profession: 'engineer',
		hobby: 'swimming',
		citation: 'eee vvvv ssss xxxx!',
	}
}
