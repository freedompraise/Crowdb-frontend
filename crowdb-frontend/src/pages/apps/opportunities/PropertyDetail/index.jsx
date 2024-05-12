import { PageBreadcrumb } from '@/components'
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { features } from './data'
import PropertyDetailCard from './components/PropertyDetailCard'
import RelatedProperties from './components/RelatedProperties';

const PropertyDetail = () => {
	return (
		<>
			<PageBreadcrumb subName="Properties" title="Property Cards" />

			<Row>
				<Col xs={12}>
					<PropertyDetailCard />
				</Col>
			</Row>

			<Row>
				{features.map((feature, idx) => {
					return (
						<Col lg={3} key={idx}>
							<Card>
								<CardBody>
									{/* <i
										className={`mdi mdi-${feature.icon} text-${feature.variant} font-40`}
									/> */}
									<h4 className="header-title">{feature.title}</h4>
									<p className="text-muted mb-0">
										{feature.description}
									</p>
								</CardBody>
							</Card>
						</Col>
					)
				})}
			</Row>
			<Row>
				<Col md={12}>
					<RelatedProperties />
				</Col>
			</Row>
		</>
	)
}
export default PropertyDetail
