package service

import "fmt"

type PartnerFactory interface {
	CreatePartner(partnerID int) (Partner, error)
}

//	-- map {
//		"url-1": "batata",
//		"url-2": "batata2"
//	}
type DefaultPartnerFactory struct {
	PartnerBaseURLs map[int]string
	// CreatePartner(parterID int) (Partner, error)
}

func NewPartnerFactory(partnerBaseURLs map[int]string) PartnerFactory {
	return &DefaultPartnerFactory{PartnerBaseURLs: partnerBaseURLs}
}

func (f *DefaultPartnerFactory) CreatePartner(parterID int) (Partner, error) {
	baseURL, ok := f.PartnerBaseURLs[parterID]
	if !ok {
		return nil, fmt.Errorf("partner with ID %d not found", parterID)
	}

	switch parterID {
	case 1:
		return &Partner1{BaseURL: baseURL}, nil
	case 2:
		return &Partner2{BaseURL: baseURL}, nil
	default:
		return nil, fmt.Errorf("partner with ID %d was not found", parterID)
	}
}
